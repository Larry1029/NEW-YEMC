import type {
  Adapter,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "@auth/core/adapters";
import type { ProviderType } from "@auth/core/providers";
import { getDatabasePool } from "../src/db.server.js";

interface PostgresUser extends AdapterUser {
  accounts: {
    provider: string;
    providerAccountId: string;
    password?: string;
  }[];
}

interface PostgresAdapter extends Adapter {
  createUser(data: Omit<AdapterUser, "id">): Promise<AdapterUser>;
  getUser(userId: string): Promise<AdapterUser | null>;
  getUserByEmail(email: string): Promise<PostgresUser | null>;
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
  }): Promise<unknown>;
}

export default function AppAdapter(): PostgresAdapter {
  const query = (text: string, values: unknown[] = []) =>
    getDatabasePool().query(text, values);

  return {
    async createVerificationToken(verificationToken: VerificationToken) {
      const { identifier, expires, token } = verificationToken;
      await query(
        `INSERT INTO auth_verification_token (identifier, expires, token)
         VALUES ($1, $2, $3)`,
        [identifier, expires, token],
      );
      return verificationToken;
    },

    async useVerificationToken({ identifier, token }) {
      const result = await query(
        `DELETE FROM auth_verification_token
         WHERE identifier = $1 AND token = $2
         RETURNING identifier, expires, token`,
        [identifier, token],
      );
      return result.rows[0] ?? null;
    },

    async createUser(user) {
      const { name, email, emailVerified, image } = user;
      const result = await query(
        `INSERT INTO auth_users (name, email, "emailVerified", image)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, "emailVerified", image`,
        [name, email, emailVerified, image],
      );
      return result.rows[0];
    },

    async getUser(id) {
      const result = await query(
        `SELECT id, name, email, "emailVerified", image
         FROM auth_users WHERE id = $1`,
        [id],
      );
      return result.rows[0] ?? null;
    },

    async getUserByEmail(email) {
      const result = await query(
        `SELECT id, name, email, "emailVerified", image
         FROM auth_users WHERE email = $1`,
        [email],
      );
      const user = result.rows[0];
      if (!user) return null;

      const accounts = await query(
        `SELECT provider, "providerAccountId", password
         FROM auth_accounts WHERE "userId" = $1`,
        [user.id],
      );
      return { ...user, accounts: accounts.rows };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const result = await query(
        `SELECT users.id, users.name, users.email, users."emailVerified", users.image
         FROM auth_users AS users
         JOIN auth_accounts AS accounts ON users.id = accounts."userId"
         WHERE accounts.provider = $1 AND accounts."providerAccountId" = $2`,
        [provider, providerAccountId],
      );
      return result.rows[0] ?? null;
    },

    async updateUser(user) {
      const existing = await query(
        `SELECT id, name, email, "emailVerified", image
         FROM auth_users WHERE id = $1`,
        [user.id],
      );
      if (!existing.rows[0]) {
        throw new Error(`Cannot update missing user ${user.id}`);
      }

      const updated = { ...existing.rows[0], ...user };
      const result = await query(
        `UPDATE auth_users
         SET name = $2, email = $3, "emailVerified" = $4, image = $5
         WHERE id = $1
         RETURNING id, name, email, "emailVerified", image`,
        [
          updated.id,
          updated.name,
          updated.email,
          updated.emailVerified,
          updated.image,
        ],
      );
      return result.rows[0];
    },

    async linkAccount(account) {
      const result = await query(
        `INSERT INTO auth_accounts (
           "userId", provider, type, "providerAccountId", access_token, expires_at,
           refresh_token, id_token, scope, session_state, token_type, password
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING id, "userId", provider, type, "providerAccountId", access_token,
                   expires_at, refresh_token, id_token, scope, session_state, token_type, password`,
        [
          account.userId,
          account.provider,
          account.type,
          account.providerAccountId,
          account.access_token,
          account.expires_at,
          account.refresh_token,
          account.id_token,
          account.scope,
          account.session_state,
          account.token_type,
          account.extraData?.password,
        ],
      );
      return result.rows[0];
    },

    async createSession({ sessionToken, userId, expires }) {
      if (userId === undefined) {
        throw new Error("userId is required to create a session");
      }
      const result = await query(
        `INSERT INTO auth_sessions ("userId", expires, "sessionToken")
         VALUES ($1, $2, $3)
         RETURNING id, "sessionToken", "userId", expires`,
        [userId, expires, sessionToken],
      );
      return result.rows[0];
    },

    async getSessionAndUser(sessionToken) {
      if (!sessionToken) return null;
      const result = await query(
        `SELECT sessions.id AS session_id, sessions."sessionToken",
                sessions."userId", sessions.expires,
                users.id, users.name, users.email, users."emailVerified", users.image
         FROM auth_sessions AS sessions
         JOIN auth_users AS users ON users.id = sessions."userId"
         WHERE sessions."sessionToken" = $1`,
        [sessionToken],
      );
      const row = result.rows[0];
      if (!row) return null;
      const { session_id, ...user } = row;
      return {
        session: {
          id: session_id,
          sessionToken: row.sessionToken,
          userId: row.userId,
          expires: row.expires,
        } as AdapterSession,
        user: user as AdapterUser,
      };
    },

    async updateSession(session) {
      const result = await query(
        `UPDATE auth_sessions SET expires = $2
         WHERE "sessionToken" = $1
         RETURNING id, "sessionToken", "userId", expires`,
        [session.sessionToken, session.expires],
      );
      return result.rows[0] ?? null;
    },

    async deleteSession(sessionToken) {
      await query(`DELETE FROM auth_sessions WHERE "sessionToken" = $1`, [
        sessionToken,
      ]);
    },

    async unlinkAccount({ provider, providerAccountId }) {
      await query(
        `DELETE FROM auth_accounts
         WHERE "providerAccountId" = $1 AND provider = $2`,
        [providerAccountId, provider],
      );
    },

    async deleteUser(userId) {
      await query(`DELETE FROM auth_users WHERE id = $1`, [userId]);
    },
  };
}
