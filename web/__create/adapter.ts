import type {
  Adapter,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from '@auth/core/adapters';
import type { ProviderType } from '@auth/core/providers';

interface SqliteUser extends AdapterUser {
  accounts: {
    provider: string;
    provider_account_id: string;
    password?: string;
  }[];
}

interface SqliteAdapter extends Adapter {
  createUser(data: Omit<AdapterUser, 'id'>): Promise<AdapterUser>;
  getUser(userId: string): Promise<AdapterUser | null>;
  getUserByEmail(email: string): Promise<SqliteUser | null>;
  getUserByAccount(data: {
    provider: string;
    providerAccountId: string;
  }): Promise<AdapterUser | null>;
  linkAccount(data: {
    userId: string;
    provider: string;
    providerAccountId: string;
    type: ProviderType;
    access_token?: string | null;
    expires_at?: number | null;
    refresh_token?: string | null;
    id_token?: string | null;
    scope?: string | null;
    session_state?: string | null;
    token_type?: string | null;
    extraData?: Record<string, unknown>;
  }): Promise<void>;
}

export default function AppAdapter(db: any): SqliteAdapter {
  return {
    async createVerificationToken(verificationToken: VerificationToken): Promise<VerificationToken> {
      const { identifier, expires, token } = verificationToken;
      const stmt = db.prepare(`
        INSERT INTO auth_verification_token (identifier, expires, token)
        VALUES (?, ?, ?)
      `);
      stmt.run(identifier, expires.toISOString(), token);
      return verificationToken;
    },
    async useVerificationToken({ identifier, token }): Promise<VerificationToken | null> {
      const stmt = db.prepare(`
        SELECT identifier, expires, token FROM auth_verification_token
        WHERE identifier = ? AND token = ?
      `);
      const result = stmt.get(identifier, token) as any;
      if (!result) return null;
      db.prepare(`DELETE FROM auth_verification_token WHERE identifier = ? AND token = ?`).run(identifier, token);
      return { ...result, expires: new Date(result.expires) };
    },
    async createUser(user: Omit<AdapterUser, 'id'>) {
      const { name, email, emailVerified, image } = user;
      const stmt = db.prepare(`
        INSERT INTO auth_users (name, email, emailVerified, image)
        VALUES (?, ?, ?, ?)
        RETURNING id, name, email, emailVerified, image
      `);
      const result = stmt.get(name, email, emailVerified?.toISOString() || null, image) as any;
      return { ...result, emailVerified: result.emailVerified ? new Date(result.emailVerified) : null };
    },
    async getUser(id: string) {
      const stmt = db.prepare('SELECT * FROM auth_users WHERE id = ?');
      const result = stmt.get(id) as any;
      if (!result) return null;
      return { ...result, emailVerified: result.emailVerified ? new Date(result.emailVerified) : null };
    },
    async getUserByEmail(email) {
      const stmt = db.prepare('SELECT * FROM auth_users WHERE email = ?');
      const userData = stmt.get(email) as any;
      if (!userData) return null;
      
      const accountsStmt = db.prepare('SELECT * FROM auth_accounts WHERE userId = ?');
      const accountsData = accountsStmt.all(userData.id) as any[];
      return {
        ...userData,
        emailVerified: userData.emailVerified ? new Date(userData.emailVerified) : null,
        accounts: accountsData
      };
    },
    async getUserByAccount({ providerAccountId, provider }): Promise<AdapterUser | null> {
      const stmt = db.prepare(`
        SELECT u.* FROM auth_users u
        JOIN auth_accounts a ON u.id = a.userId
        WHERE a.provider = ? AND a.providerAccountId = ?
      `);
      const result = stmt.get(provider, providerAccountId) as any;
      if (!result) return null;
      return { ...result, emailVerified: result.emailVerified ? new Date(result.emailVerified) : null };
    },
    async updateUser(user: Partial<AdapterUser>): Promise<AdapterUser> {
      const fetchStmt = db.prepare('SELECT * FROM auth_users WHERE id = ?');
      const oldUser = fetchStmt.get(user.id) as any;
      const newUser = { ...oldUser, ...user };
      const { id, name, email, emailVerified, image } = newUser;
      
      const updateStmt = db.prepare(`
        UPDATE auth_users SET
        name = ?, email = ?, emailVerified = ?, image = ?
        WHERE id = ?
        RETURNING id, name, email, emailVerified, image
      `);
      const result = updateStmt.get(name, email, emailVerified?.toISOString() || null, image, id) as any;
      return { ...result, emailVerified: result.emailVerified ? new Date(result.emailVerified) : null };
    },
    async linkAccount(account) {
      const stmt = db.prepare(`
        INSERT INTO auth_accounts (
          userId, provider, type, providerAccountId, access_token, expires_at,
          refresh_token, id_token, scope, session_state, token_type, password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING *
      `);
      const result = stmt.get(
        account.userId, account.provider, account.type, account.providerAccountId,
        account.access_token, account.expires_at, account.refresh_token, account.id_token,
        account.scope, account.session_state, account.token_type, account.extraData?.password
      ) as any;
      return result;
    },
    async createSession({ sessionToken, userId, expires }) {
      const stmt = db.prepare(`
        INSERT INTO auth_sessions (userId, expires, sessionToken)
        VALUES (?, ?, ?)
        RETURNING id, sessionToken, userId, expires
      `);
      const result = stmt.get(userId, expires.toISOString(), sessionToken) as any;
      return { ...result, expires: new Date(result.expires) };
    },
    async getSessionAndUser(sessionToken: string | undefined): Promise<{ session: AdapterSession; user: AdapterUser; } | null> {
      if (!sessionToken) return null;
      
      const sessionStmt = db.prepare('SELECT * FROM auth_sessions WHERE sessionToken = ?');
      const session = sessionStmt.get(sessionToken) as any;
      if (!session) return null;
      
      const userStmt = db.prepare('SELECT * FROM auth_users WHERE id = ?');
      const user = userStmt.get(session.userId) as any;
      if (!user) return null;
      
      return {
        session: { ...session, expires: new Date(session.expires) },
        user: { ...user, emailVerified: user.emailVerified ? new Date(user.emailVerified) : null },
      };
    },
    async updateSession(session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>): Promise<AdapterSession | null | undefined> {
      const { sessionToken } = session;
      const sessionStmt = db.prepare('SELECT * FROM auth_sessions WHERE sessionToken = ?');
      const originalSession = sessionStmt.get(sessionToken) as any;
      if (!originalSession) return null;
      
      const newSession = { ...originalSession, ...session };
      const updateStmt = db.prepare(`
        UPDATE auth_sessions SET expires = ? WHERE sessionToken = ?
        RETURNING id, sessionToken, userId, expires
      `);
      const result = updateStmt.get(newSession.expires instanceof Date ? newSession.expires.toISOString() : newSession.expires, newSession.sessionToken) as any;
      return { ...result, expires: new Date(result.expires) };
    },
    async deleteSession(sessionToken) {
      db.prepare('DELETE FROM auth_sessions WHERE sessionToken = ?').run(sessionToken);
    },
    async unlinkAccount(partialAccount) {
      const { provider, providerAccountId } = partialAccount;
      db.prepare('DELETE FROM auth_accounts WHERE providerAccountId = ? AND provider = ?').run(providerAccountId, provider);
    },
    async deleteUser(userId: string) {
      db.prepare('DELETE FROM auth_users WHERE id = ?').run(userId);
    }
  };
}
