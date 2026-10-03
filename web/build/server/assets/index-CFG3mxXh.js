import 'dotenv/config';
import { AsyncLocalStorage } from 'node:async_hooks';
import process$1 from 'node:process';
import nodeConsole from 'node:console';
import Database from 'better-sqlite3';
import { verify, hash } from 'argon2';
import { Hono } from 'hono';
import { getContext, contextStorage } from 'hono/context-storage';
import { cors } from 'hono/cors';
import { proxy } from 'hono/proxy';
import 'hono/body-limit';
import { requestId } from 'hono/request-id';
import { createMiddleware } from 'hono/factory';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { logger } from 'hono/logger';
import { createRequestHandler } from 'react-router';
import { serializeError } from 'serialize-error';
import { getToken } from '@auth/core/jwt';
import 'react';
import { join } from 'node:path';
import 'react-dom/server';
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { route, index as index$1 } from '@react-router/dev/routes';
import { neon, Pool } from '@neondatabase/serverless';
import Credentials from '@auth/core/providers/credentials';
import Google from '@auth/core/providers/google';
import { readdir, stat } from 'node:fs/promises';
import { setCookie, getCookie, deleteCookie } from 'hono/cookie';
import crypto from 'node:crypto';
import QRCode from 'qrcode';

var defaultWebSocket = {
  upgradeWebSocket: () => {
  },
  injectWebSocket: (server) => server
};
async function createWebSocket({ app, enabled }) {
  if (!enabled) {
    return defaultWebSocket;
  }
  process.env.NODE_ENV === "development" ? "development" : "production";
  {
    const { createNodeWebSocket } = await import('@hono/node-ws');
    const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });
    return {
      upgradeWebSocket,
      injectWebSocket(server) {
        injectWebSocket(server);
        return server;
      }
    };
  }
}
function cleanUpgradeListeners(httpServer) {
  const upgradeListeners = httpServer.listeners("upgrade").filter((listener) => listener.name !== "hmrServerWsListener");
  for (const listener of upgradeListeners) {
    httpServer.removeListener(
      "upgrade",
      /* @ts-ignore - we don't care */
      listener
    );
  }
}
function patchUpgradeListener(httpServer) {
  const upgradeListeners = httpServer.listeners("upgrade").filter((listener) => listener.name !== "hmrServerWsListener");
  for (const listener of upgradeListeners) {
    httpServer.removeListener(
      "upgrade",
      /* @ts-ignore - we don't care */
      listener
    );
    httpServer.on("upgrade", (request, ...rest) => {
      if (request.headers["sec-websocket-protocol"] === "vite-hmr") {
        return;
      }
      return listener(request, ...rest);
    });
  }
}
function bindIncomingRequestSocketInfo() {
  return createMiddleware((c, next) => {
    c.env.server = {
      incoming: {
        socket: {
          remoteAddress: c.req.raw.headers.get("x-remote-address") || void 0,
          remotePort: Number(c.req.raw.headers.get("x-remote-port")) || void 0,
          remoteFamily: c.req.raw.headers.get("x-remote-family") || void 0
        }
      }
    };
    return next();
  });
}
async function importBuild() {
  return await import(
    // @ts-expect-error - Virtual module provided by React Router at build time
    './server-build.js'
  );
}
function getBuildMode() {
  return process.env.NODE_ENV === "development" ? "development" : "production";
}

// src/middleware.ts
function cache(seconds) {
  return createMiddleware(async (c, next) => {
    if (!c.req.path.match(/\.[a-zA-Z0-9]+$/) || c.req.path.endsWith(".data")) {
      return next();
    }
    await next();
    if (!c.res.ok || c.res.headers.has("cache-control")) {
      return;
    }
    c.res.headers.set("cache-control", `public, max-age=${seconds}`);
  });
}

async function createHonoServer(options) {
  const startTime = Date.now();
  const build = await importBuild();
  const basename = "/";
  const mergedOptions = {
    ...options,
    listeningListener: options?.listeningListener || ((info) => {
      console.log(`🚀 Server started on port ${info.port}`);
      console.log(`🌍 http://127.0.0.1:${info.port}`);
      console.log(`🏎️ Server started in ${Date.now() - startTime}ms`);
    }),
    port: options?.port || Number(process.env.PORT) || 3e3,
    defaultLogger: options?.defaultLogger ?? true,
    overrideGlobalObjects: options?.overrideGlobalObjects ?? false
  };
  const mode = getBuildMode();
  const PRODUCTION = mode === "production";
  const clientBuildPath = `${"build"}/client`;
  const app = new Hono(mergedOptions.app);
  const { upgradeWebSocket, injectWebSocket } = await createWebSocket({
    app,
    enabled: mergedOptions.useWebSocket ?? false
  });
  if (!PRODUCTION) {
    app.use(bindIncomingRequestSocketInfo());
  }
  await mergedOptions.beforeAll?.(app);
  app.use(
    `/${"assets"}/*`,
    cache(60 * 60 * 24 * 365),
    // 1 year
    serveStatic({ root: clientBuildPath, ...mergedOptions.serveStaticOptions?.clientAssets })
  );
  app.use(
    "*",
    cache(60 * 60),
    // 1 hour
    serveStatic({ root: PRODUCTION ? clientBuildPath : "./public", ...mergedOptions.serveStaticOptions?.publicAssets })
  );
  if (mergedOptions.defaultLogger) {
    app.use("*", logger());
  }
  if (mergedOptions.useWebSocket) {
    await mergedOptions.configure(app, { upgradeWebSocket });
  } else {
    await mergedOptions.configure?.(app);
  }
  const reactRouterApp = new Hono({
    strict: false
  });
  reactRouterApp.use((c, next) => {
    return createMiddleware(async (c2) => {
      const requestHandler = createRequestHandler(build, mode);
      const loadContext = mergedOptions.getLoadContext?.(c2, { build, mode });
      return requestHandler(c2.req.raw, loadContext instanceof Promise ? await loadContext : loadContext);
    })(c, next);
  });
  app.route(`${basename}`, reactRouterApp);
  {
    app.route(`${basename}.data`, reactRouterApp);
  }
  if (PRODUCTION) {
    const server = serve(
      {
        ...app,
        ...mergedOptions.customNodeServer,
        port: mergedOptions.port,
        overrideGlobalObjects: mergedOptions.overrideGlobalObjects,
        hostname: mergedOptions.hostname
      },
      mergedOptions.listeningListener
    );
    mergedOptions.onServe?.(server);
    injectWebSocket(server);
  } else if (globalThis.__viteDevServer?.httpServer) {
    const httpServer = globalThis.__viteDevServer.httpServer;
    cleanUpgradeListeners(httpServer);
    mergedOptions.onServe?.(httpServer);
    injectWebSocket(httpServer);
    patchUpgradeListener(httpServer);
    console.log("🚧 Dev server started");
  }
  return app;
}

function AppAdapter(db) {
  return {
    async createVerificationToken(verificationToken) {
      const { identifier, expires, token } = verificationToken;
      const stmt = db.prepare(`
        INSERT INTO auth_verification_token (identifier, expires, token)
        VALUES (?, ?, ?)
      `);
      stmt.run(identifier, expires.toISOString(), token);
      return verificationToken;
    },
    async useVerificationToken({ identifier, token }) {
      const stmt = db.prepare(`
        SELECT identifier, expires, token FROM auth_verification_token
        WHERE identifier = ? AND token = ?
      `);
      const result = stmt.get(identifier, token);
      if (!result) return null;
      db.prepare(`DELETE FROM auth_verification_token WHERE identifier = ? AND token = ?`).run(identifier, token);
      return { ...result, expires: new Date(result.expires) };
    },
    async createUser(user) {
      const { name, email, emailVerified, image } = user;
      const stmt = db.prepare(`
        INSERT INTO auth_users (name, email, emailVerified, image)
        VALUES (?, ?, ?, ?)
        RETURNING id, name, email, emailVerified, image
      `);
      const result = stmt.get(name, email, emailVerified?.toISOString() || null, image);
      return { ...result, emailVerified: result.emailVerified ? new Date(result.emailVerified) : null };
    },
    async getUser(id) {
      const stmt = db.prepare("SELECT * FROM auth_users WHERE id = ?");
      const result = stmt.get(id);
      if (!result) return null;
      return { ...result, emailVerified: result.emailVerified ? new Date(result.emailVerified) : null };
    },
    async getUserByEmail(email) {
      const stmt = db.prepare("SELECT * FROM auth_users WHERE email = ?");
      const userData = stmt.get(email);
      if (!userData) return null;
      const accountsStmt = db.prepare("SELECT * FROM auth_accounts WHERE userId = ?");
      const accountsData = accountsStmt.all(userData.id);
      return {
        ...userData,
        emailVerified: userData.emailVerified ? new Date(userData.emailVerified) : null,
        accounts: accountsData
      };
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const stmt = db.prepare(`
        SELECT u.* FROM auth_users u
        JOIN auth_accounts a ON u.id = a.userId
        WHERE a.provider = ? AND a.providerAccountId = ?
      `);
      const result = stmt.get(provider, providerAccountId);
      if (!result) return null;
      return { ...result, emailVerified: result.emailVerified ? new Date(result.emailVerified) : null };
    },
    async updateUser(user) {
      const fetchStmt = db.prepare("SELECT * FROM auth_users WHERE id = ?");
      const oldUser = fetchStmt.get(user.id);
      const newUser = { ...oldUser, ...user };
      const { id, name, email, emailVerified, image } = newUser;
      const updateStmt = db.prepare(`
        UPDATE auth_users SET
        name = ?, email = ?, emailVerified = ?, image = ?
        WHERE id = ?
        RETURNING id, name, email, emailVerified, image
      `);
      const result = updateStmt.get(name, email, emailVerified?.toISOString() || null, image, id);
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
        account.extraData?.password
      );
      return result;
    },
    async createSession({ sessionToken, userId, expires }) {
      const stmt = db.prepare(`
        INSERT INTO auth_sessions (userId, expires, sessionToken)
        VALUES (?, ?, ?)
        RETURNING id, sessionToken, userId, expires
      `);
      const result = stmt.get(userId, expires.toISOString(), sessionToken);
      return { ...result, expires: new Date(result.expires) };
    },
    async getSessionAndUser(sessionToken) {
      if (!sessionToken) return null;
      const sessionStmt = db.prepare("SELECT * FROM auth_sessions WHERE sessionToken = ?");
      const session = sessionStmt.get(sessionToken);
      if (!session) return null;
      const userStmt = db.prepare("SELECT * FROM auth_users WHERE id = ?");
      const user = userStmt.get(session.userId);
      if (!user) return null;
      return {
        session: { ...session, expires: new Date(session.expires) },
        user: { ...user, emailVerified: user.emailVerified ? new Date(user.emailVerified) : null }
      };
    },
    async updateSession(session) {
      const { sessionToken } = session;
      const sessionStmt = db.prepare("SELECT * FROM auth_sessions WHERE sessionToken = ?");
      const originalSession = sessionStmt.get(sessionToken);
      if (!originalSession) return null;
      const newSession = { ...originalSession, ...session };
      const updateStmt = db.prepare(`
        UPDATE auth_sessions SET expires = ? WHERE sessionToken = ?
        RETURNING id, sessionToken, userId, expires
      `);
      const result = updateStmt.get(newSession.expires instanceof Date ? newSession.expires.toISOString() : newSession.expires, newSession.sessionToken);
      return { ...result, expires: new Date(result.expires) };
    },
    async deleteSession(sessionToken) {
      db.prepare("DELETE FROM auth_sessions WHERE sessionToken = ?").run(sessionToken);
    },
    async unlinkAccount(partialAccount) {
      const { provider, providerAccountId } = partialAccount;
      db.prepare("DELETE FROM auth_accounts WHERE providerAccountId = ? AND provider = ?").run(providerAccountId, provider);
    },
    async deleteUser(userId) {
      db.prepare("DELETE FROM auth_users WHERE id = ?").run(userId);
    }
  };
}

const getHTMLForErrorPage = (err) => {
  return `
<html>
  <head>
    <script>
    window.onload = () => {
      const error = ${JSON.stringify(serializeError(err))};
      window.parent.postMessage({ type: 'sandbox:web:ready' }, '*');
      window.parent.postMessage({ type: 'sandbox:error:detected', error: error }, '*');
      const healthyResponse = {
        type: 'sandbox:web:healthcheck:response',
        healthy: true,
        hasError: true,
        supportsErrorDetected: true,
      };
      window.addEventListener('message', (event) => {
        if (event.data.type === 'sandbox:navigation') {
          window.location.pathname = event.data.pathname;
        }
        if (event.data.type === 'sandbox:web:healthcheck') {
          window.parent.postMessage(healthyResponse, '*');
        }
      });
      console.error(error);
    }
    <\/script>
  </head>
  <body></body>
</html>
    `;
};

const __dirname$2 = fileURLToPath(new URL(".", import.meta.url));
function buildRouteTree(dir, basePath = "") {
  const files = readdirSync(dir);
  const node = {
    path: basePath,
    children: [],
    hasPage: false,
    isParam: false,
    isCatchAll: false,
    paramName: ""
  };
  const dirName = basePath.split("/").pop();
  if (dirName?.startsWith("[") && dirName.endsWith("]")) {
    node.isParam = true;
    const paramName = dirName.slice(1, -1);
    if (paramName.startsWith("...")) {
      node.isCatchAll = true;
      node.paramName = paramName.slice(3);
    } else {
      node.paramName = paramName;
    }
  }
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      const childPath = basePath ? `${basePath}/${file}` : file;
      const childNode = buildRouteTree(filePath, childPath);
      node.children.push(childNode);
    } else if (file === "page.jsx") {
      node.hasPage = true;
    }
  }
  return node;
}
function generateRoutes(node) {
  const routes2 = [];
  if (node.hasPage) {
    const componentPath = node.path === "" ? `./${node.path}page.jsx` : `./${node.path}/page.jsx`;
    if (node.path === "") {
      routes2.push(index$1(componentPath));
    } else {
      let routePath = node.path;
      const segments = routePath.split("/");
      const processedSegments = segments.map((segment) => {
        if (segment.startsWith("[") && segment.endsWith("]")) {
          const paramName = segment.slice(1, -1);
          if (paramName.startsWith("...")) {
            return "*";
          }
          if (paramName.startsWith("[") && paramName.endsWith("]")) {
            return `:${paramName.slice(1, -1)}?`;
          }
          return `:${paramName}`;
        }
        return segment;
      });
      routePath = processedSegments.join("/");
      routes2.push(route(routePath, componentPath));
    }
  }
  for (const child of node.children) {
    routes2.push(...generateRoutes(child));
  }
  return routes2;
}
const tree = buildRouteTree(__dirname$2);
const notFound = route("*?", "./__create/not-found.tsx");
[...generateRoutes(tree), notFound];

const NullishQueryFunction = () => {
  throw new Error('No database connection string was provided to `neon()`. Perhaps process.env.DATABASE_URL has not been set');
};
NullishQueryFunction.transaction = () => {
  throw new Error('No database connection string was provided to `neon()`. Perhaps process.env.DATABASE_URL has not been set');
};
process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : NullishQueryFunction;

function CreateAuth() {
  const auth = async () => {
    const c = getContext();
    const token = await getToken({
      req: c.req.raw,
      secret: process.env.AUTH_SECRET,
      secureCookie: process.env.AUTH_URL.startsWith('https')
    });
    if (token) {
      return {
        user: {
          id: token.sub,
          email: token.email,
          name: token.name,
          image: token.picture
        },
        expires: token.exp.toString()
      };
    }
  };
  return {
    auth
  };
}

function Adapter(client) {
  return {
    async createVerificationToken(verificationToken) {
      const {
        identifier,
        expires,
        token
      } = verificationToken;
      const sql = `
        INSERT INTO auth_verification_token ( identifier, expires, token )
        VALUES ($1, $2, $3)
        `;
      await client.query(sql, [identifier, expires, token]);
      return verificationToken;
    },
    async useVerificationToken({
      identifier,
      token
    }) {
      const sql = `delete from auth_verification_token
      where identifier = $1 and token = $2
      RETURNING identifier, expires, token `;
      const result = await client.query(sql, [identifier, token]);
      return result.rowCount !== 0 ? result.rows[0] : null;
    },
    async createUser(user) {
      const {
        name,
        email,
        emailVerified,
        image
      } = user;
      const sql = `
        INSERT INTO auth_users (name, email, "emailVerified", image)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, "emailVerified", image`;
      const result = await client.query(sql, [name, email, emailVerified, image]);
      return result.rows[0];
    },
    async getUser(id) {
      const sql = 'select * from auth_users where id = $1';
      try {
        const result = await client.query(sql, [id]);
        return result.rowCount === 0 ? null : result.rows[0];
      } catch {
        return null;
      }
    },
    async getUserByEmail(email) {
      const sql = 'select * from auth_users where email = $1';
      const result = await client.query(sql, [email]);
      if (result.rowCount === 0) {
        return null;
      }
      const userData = result.rows[0];
      const accountsData = await client.query('select * from auth_accounts where "userId" = $1', [userData.id]);
      return {
        ...userData,
        accounts: accountsData.rows
      };
    },
    async getUserByAccount({
      providerAccountId,
      provider
    }) {
      const sql = `
          select u.* from auth_users u join auth_accounts a on u.id = a."userId"
          where
          a.provider = $1
          and
          a."providerAccountId" = $2`;
      const result = await client.query(sql, [provider, providerAccountId]);
      return result.rowCount !== 0 ? result.rows[0] : null;
    },
    async updateUser(user) {
      const fetchSql = 'select * from auth_users where id = $1';
      const query1 = await client.query(fetchSql, [user.id]);
      const oldUser = query1.rows[0];
      const newUser = {
        ...oldUser,
        ...user
      };
      const {
        id,
        name,
        email,
        emailVerified,
        image
      } = newUser;
      const updateSql = `
        UPDATE auth_users set
        name = $2, email = $3, "emailVerified" = $4, image = $5
        where id = $1
        RETURNING name, id, email, "emailVerified", image
      `;
      const query2 = await client.query(updateSql, [id, name, email, emailVerified, image]);
      return query2.rows[0];
    },
    async linkAccount(account) {
      const sql = `
      insert into auth_accounts
      (
        "userId",
        provider,
        type,
        "providerAccountId",
        access_token,
        expires_at,
        refresh_token,
        id_token,
        scope,
        session_state,
        token_type,
        password
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      returning
        id,
        "userId",
        provider,
        type,
        "providerAccountId",
        access_token,
        expires_at,
        refresh_token,
        id_token,
        scope,
        session_state,
        token_type,
        password
      `;
      const params = [account.userId, account.provider, account.type, account.providerAccountId, account.access_token, account.expires_at, account.refresh_token, account.id_token, account.scope, account.session_state, account.token_type, account.extraData?.password];
      const result = await client.query(sql, params);
      return result.rows[0];
    },
    async createSession({
      sessionToken,
      userId,
      expires
    }) {
      if (userId === undefined) {
        throw Error('userId is undef in createSession');
      }
      const sql = `insert into auth_sessions ("userId", expires, "sessionToken")
      values ($1, $2, $3)
      RETURNING id, "sessionToken", "userId", expires`;
      const result = await client.query(sql, [userId, expires, sessionToken]);
      return result.rows[0];
    },
    async getSessionAndUser(sessionToken) {
      if (sessionToken === undefined) {
        return null;
      }
      const result1 = await client.query(`select * from auth_sessions where "sessionToken" = $1`, [sessionToken]);
      if (result1.rowCount === 0) {
        return null;
      }
      const session = result1.rows[0];
      const result2 = await client.query('select * from auth_users where id = $1', [session.userId]);
      if (result2.rowCount === 0) {
        return null;
      }
      const user = result2.rows[0];
      return {
        session,
        user
      };
    },
    async updateSession(session) {
      const {
        sessionToken
      } = session;
      const result1 = await client.query(`select * from auth_sessions where "sessionToken" = $1`, [sessionToken]);
      if (result1.rowCount === 0) {
        return null;
      }
      const originalSession = result1.rows[0];
      const newSession = {
        ...originalSession,
        ...session
      };
      const sql = `
        UPDATE auth_sessions set
        expires = $2
        where "sessionToken" = $1
        `;
      const result = await client.query(sql, [newSession.sessionToken, newSession.expires]);
      return result.rows[0];
    },
    async deleteSession(sessionToken) {
      const sql = `delete from auth_sessions where "sessionToken" = $1`;
      await client.query(sql, [sessionToken]);
    },
    async unlinkAccount(partialAccount) {
      const {
        provider,
        providerAccountId
      } = partialAccount;
      const sql = `delete from auth_accounts where "providerAccountId" = $1 and provider = $2`;
      await client.query(sql, [providerAccountId, provider]);
    },
    async deleteUser(userId) {
      await client.query('delete from auth_users where id = $1', [userId]);
      await client.query('delete from auth_sessions where "userId" = $1', [userId]);
      await client.query('delete from auth_accounts where "userId" = $1', [userId]);
    }
  };
}
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const adapter$1 = Adapter(pool);
CreateAuth({
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }), Credentials({
    id: 'credentials-signin',
    name: 'Credentials Sign in',
    credentials: {
      email: {
        label: 'Email',
        type: 'email'
      },
      password: {
        label: 'Password',
        type: 'password'
      }
    },
    authorize: async credentials => {
      const {
        email,
        password
      } = credentials;
      if (!email || !password) {
        return null;
      }
      if (typeof email !== 'string' || typeof password !== 'string') {
        return null;
      }
      const user = await adapter$1.getUserByEmail(email);
      if (!user) {
        return null;
      }
      const matchingAccount = user.accounts.find(account => account.provider === 'credentials');
      const accountPassword = matchingAccount?.password;
      if (!accountPassword) {
        return null;
      }
      const isValid = await verify(accountPassword, password);
      if (!isValid) {
        return null;
      }
      return user;
    }
  }), Credentials({
    id: 'credentials-signup',
    name: 'Credentials Sign up',
    credentials: {
      email: {
        label: 'Email',
        type: 'email'
      },
      password: {
        label: 'Password',
        type: 'password'
      },
      name: {
        label: 'Name',
        type: 'text',
        required: false
      },
      image: {
        label: 'Image',
        type: 'text',
        required: false
      }
    },
    authorize: async credentials => {
      const {
        email,
        password
      } = credentials;
      if (!email || !password) {
        return null;
      }
      if (typeof email !== 'string' || typeof password !== 'string') {
        return null;
      }
      const user = await adapter$1.getUserByEmail(email);
      if (!user) {
        const newUser = await adapter$1.createUser({
          emailVerified: null,
          email,
          name: typeof credentials.name === 'string' && credentials.name.trim().length > 0 ? credentials.name : undefined,
          image: typeof credentials.image === 'string' ? credentials.image : undefined
        });
        await adapter$1.linkAccount({
          extraData: {
            password: await hash(password)
          },
          type: 'credentials',
          userId: newUser.id,
          providerAccountId: newUser.id,
          provider: 'credentials'
        });
        return newUser;
      }
      return null;
    }
  })]});

async function sendEmail({
  to,
  from,
  subject,
  html,
  text,
  attachments = []
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: from || process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      ...(attachments.length > 0 ? {
        attachments
      } : {})
    })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to send email");
  }
  return {
    id: data.id
  };
}

const originalFetch = fetch;
const isBackend = () => typeof window === "undefined";
const safeStringify = (value) => JSON.stringify(value, (_k, v) => {
  if (v instanceof Date) return { __t: "Date", v: v.toISOString() };
  if (v instanceof Error)
    return { __t: "Error", v: { name: v.name, message: v.message, stack: v.stack } };
  return v;
});
const postToParent = (level, text, extra) => {
  try {
    if (isBackend() || !window.parent || window.parent === window) {
      ("level" in console ? console[level] : console.log)(text, extra);
      return;
    }
    window.parent.postMessage(
      {
        type: "sandbox:web:console-write",
        __viteConsole: true,
        level,
        text,
        args: [safeStringify(extra)]
      },
      "*"
    );
  } catch {
  }
};
const getUrlFromArgs = (...args) => {
  const [input] = args;
  if (typeof input === "string") return input;
  if (input instanceof Request) return input.url;
  return `${input.protocol}//${input.host}${input.pathname}${input.search}${input.hash}`;
};
const isFirstPartyURL = (url) => {
  return url.startsWith("/integrations") || url.startsWith("/_create");
};
const isSecondPartyUrl = (url) => {
  return Boolean(
    process.env.NEXT_PUBLIC_CREATE_API_BASE_URL && url.startsWith(process.env.NEXT_PUBLIC_CREATE_API_BASE_URL) || process.env.NEXT_PUBLIC_CREATE_BASE_URL && url.startsWith(process.env.NEXT_PUBLIC_CREATE_BASE_URL) || url.startsWith("https://www.create.xyz") || url.startsWith("https://api.create.xyz/") || url.startsWith("https://www.createanything.com") || url.startsWith("https://api.createanything.com")
  );
};
const fetchWithHeaders = async (input, init) => {
  const url = getUrlFromArgs(input, init);
  const additionalHeaders = {
    "x-createxyz-project-group-id": process.env.NEXT_PUBLIC_PROJECT_GROUP_ID
  };
  const isExternalFetch = !isFirstPartyURL(url) && !isSecondPartyUrl(url);
  if (isExternalFetch || url.startsWith("/api")) {
    return originalFetch(input, init);
  }
  let finalInit;
  if (input instanceof Request) {
    const hasBody = !!input.body;
    finalInit = {
      method: input.method,
      headers: new Headers(input.headers),
      body: input.body,
      mode: input.mode,
      credentials: input.credentials,
      cache: input.cache,
      redirect: input.redirect,
      referrer: input.referrer,
      referrerPolicy: input.referrerPolicy,
      integrity: input.integrity,
      keepalive: input.keepalive,
      signal: input.signal,
      ...hasBody ? { duplex: "half" } : {},
      ...init
    };
  } else {
    finalInit = { ...init, headers: new Headers(init?.headers ?? {}) };
  }
  const finalHeaders = new Headers(finalInit.headers);
  for (const [key, value] of Object.entries(additionalHeaders)) {
    if (value) finalHeaders.set(key, value);
  }
  finalInit.headers = finalHeaders;
  const prefix = !isSecondPartyUrl(url) ? isBackend() ? process.env.NEXT_PUBLIC_CREATE_BASE_URL ?? "https://www.create.xyz" : "" : "";
  try {
    const result = await originalFetch(`${prefix}${url}`, finalInit);
    if (!result.ok) {
      postToParent(
        "error",
        `Failed to load resource: the server responded with a status of ${result.status} (${result.statusText ?? ""})`,
        {
          url,
          status: result.status,
          statusText: result.statusText
        }
      );
    }
    return result;
  } catch (error) {
    postToParent("error", "Fetch error", {
      url,
      error: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error
    });
    throw error;
  }
};

const API_BASENAME = "/api";
const api = new Hono();
const __dirname$1 = join(fileURLToPath(new URL(".", import.meta.url)), "../src/app/api");
if (globalThis.fetch) {
  globalThis.fetch = fetchWithHeaders;
}
async function findRouteFiles(dir) {
  const files = await readdir(dir);
  let routes = [];
  for (const file of files) {
    try {
      const filePath = join(dir, file);
      const statResult = await stat(filePath);
      if (statResult.isDirectory()) {
        routes = routes.concat(await findRouteFiles(filePath));
      } else if (file === "route.js") {
        if (filePath === join(__dirname$1, "route.js")) {
          routes.unshift(filePath);
        } else {
          routes.push(filePath);
        }
      }
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }
  return routes;
}
function getHonoPath(routeFile) {
  const relativePath = routeFile.replace(__dirname$1, "");
  const parts = relativePath.split("/").filter(Boolean);
  const routeParts = parts.slice(0, -1);
  if (routeParts.length === 0) {
    return [{ name: "root", pattern: "" }];
  }
  const transformedParts = routeParts.map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [_, dots, param] = match;
      return dots === "..." ? { name: param, pattern: `:${param}{.+}` } : { name: param, pattern: `:${param}` };
    }
    return { name: segment, pattern: segment };
  });
  return transformedParts;
}
async function registerRoutes() {
  const routeFiles = (await findRouteFiles(__dirname$1).catch((error) => {
    console.error("Error finding route files:", error);
    return [];
  })).slice().sort((a, b) => {
    return b.length - a.length;
  });
  api.routes = [];
  for (const routeFile of routeFiles) {
    try {
      const fileUrl = pathToFileURL(routeFile).href;
      const route = await import(
        /* @vite-ignore */
        `${fileUrl}?update=${Date.now()}`
      );
      const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
      for (const method of methods) {
        try {
          if (route[method]) {
            const parts = getHonoPath(routeFile);
            const honoPath = `/${parts.map(({ pattern }) => pattern).join("/")}`;
            const handler = async (c) => {
              const params = c.req.param();
              if (false) ;
              return await route[method](c.req.raw, { params });
            };
            const methodLowercase = method.toLowerCase();
            switch (methodLowercase) {
              case "get":
                api.get(honoPath, handler);
                break;
              case "post":
                api.post(honoPath, handler);
                break;
              case "put":
                api.put(honoPath, handler);
                break;
              case "delete":
                api.delete(honoPath, handler);
                break;
              case "patch":
                api.patch(honoPath, handler);
                break;
              default:
                console.warn(`Unsupported method: ${method}`);
                break;
            }
          }
        } catch (error) {
          console.error(`Error registering route ${routeFile} for method ${method}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error importing route file ${routeFile}:`, error);
    }
  }
}
registerRoutes().catch(console.error);

const als = new AsyncLocalStorage();
for (const method of ["log", "info", "warn", "error", "debug"]) {
  const original = nodeConsole[method].bind(console);
  console[method] = (...args) => {
    const requestId2 = als.getStore()?.requestId;
    if (requestId2) {
      original(`[traceId:${requestId2}]`, ...args);
    } else {
      original(...args);
    }
  };
}
const db = new Database("local.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS auth_users (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name TEXT,
    email TEXT UNIQUE,
    emailVerified DATETIME,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS auth_accounts (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    userId TEXT NOT NULL,
    provider TEXT NOT NULL,
    type TEXT NOT NULL,
    providerAccountId TEXT NOT NULL,
    access_token TEXT,
    expires_at INTEGER,
    refresh_token TEXT,
    id_token TEXT,
    scope TEXT,
    session_state TEXT,
    token_type TEXT,
    password TEXT,
    FOREIGN KEY (userId) REFERENCES auth_users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS auth_sessions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    userId TEXT NOT NULL,
    expires DATETIME NOT NULL,
    sessionToken TEXT UNIQUE NOT NULL,
    FOREIGN KEY (userId) REFERENCES auth_users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS auth_verification_token (
    identifier TEXT NOT NULL,
    expires DATETIME NOT NULL,
    token TEXT NOT NULL,
    PRIMARY KEY (identifier, token)
  );

  CREATE TABLE IF NOT EXISTS join_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    status TEXT NOT NULL,
    institution TEXT NOT NULL,
    message TEXT NOT NULL,
    consentGiven INTEGER NOT NULL DEFAULT 0,
    consentGivenAt DATETIME,
    qrToken TEXT,
    checkedInAt DATETIME,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
const joinApplicationColumns = db.prepare("PRAGMA table_info(join_applications)").all();
if (!joinApplicationColumns.some((column) => column.name === "consentGiven")) {
  db.exec("ALTER TABLE join_applications ADD COLUMN consentGiven INTEGER NOT NULL DEFAULT 0");
}
if (!joinApplicationColumns.some((column) => column.name === "consentGivenAt")) {
  db.exec("ALTER TABLE join_applications ADD COLUMN consentGivenAt DATETIME");
}
if (!joinApplicationColumns.some((column) => column.name === "qrToken")) {
  db.exec("ALTER TABLE join_applications ADD COLUMN qrToken TEXT");
}
if (!joinApplicationColumns.some((column) => column.name === "checkedInAt")) {
  db.exec("ALTER TABLE join_applications ADD COLUMN checkedInAt DATETIME");
}
db.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_join_applications_qrToken ON join_applications(qrToken) WHERE qrToken IS NOT NULL");
const adapter = AppAdapter(db);
const app = new Hono();
app.use("*", requestId());
app.use("*", (c, next) => {
  const requestId2 = c.get("requestId");
  return als.run({ requestId: requestId2 }, () => next());
});
app.use(contextStorage());
app.onError((err, c) => {
  if (c.req.method !== "GET") {
    return c.json(
      {
        error: "An error occurred in your app",
        details: serializeError(err)
      },
      500
    );
  }
  return c.html(getHTMLForErrorPage(err), 200);
});
if (process$1.env.CORS_ORIGINS) {
  app.use(
    "/*",
    cors({
      origin: process$1.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
    })
  );
}
app.post("/api/auth/signup", async (c) => {
  const rawBody = await c.req.raw.text();
  let body = {};
  if (rawBody) {
    try {
      body = JSON.parse(rawBody);
    } catch {
      return c.json({ error: "Invalid JSON payload" }, 400);
    }
  }
  const { email, password, name } = body;
  if (!email || !password) return c.json({ error: "Missing email or password" }, 400);
  const existingUser = await adapter.getUserByEmail(email);
  if (existingUser) return c.json({ error: "User already exists" }, 400);
  const newUser = await adapter.createUser({
    emailVerified: null,
    email,
    name: typeof name === "string" && name.length > 0 ? name : void 0
  });
  await adapter.linkAccount({
    extraData: { password: await hash(password) },
    type: "credentials",
    userId: newUser.id,
    providerAccountId: newUser.id,
    provider: "credentials"
  });
  const sessionToken = crypto.randomUUID();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3);
  await adapter.createSession({ sessionToken, userId: newUser.id, expires });
  setCookie(c, "sessionToken", sessionToken, {
    expires,
    httpOnly: true,
    secure: process$1.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/"
  });
  return c.json({ user: newUser });
});
app.post("/api/auth/signin", async (c) => {
  const body = await c.req.json();
  const { email, password } = body;
  if (!email || !password) return c.json({ error: "Missing email or password" }, 400);
  const user = await adapter.getUserByEmail(email);
  if (!user) return c.json({ error: "Invalid credentials" }, 400);
  const matchingAccount = user.accounts.find((acc) => acc.provider === "credentials");
  if (!matchingAccount?.password) return c.json({ error: "Invalid credentials" }, 400);
  const isValid = await verify(matchingAccount.password, password);
  if (!isValid) return c.json({ error: "Invalid credentials" }, 400);
  const sessionToken = crypto.randomUUID();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3);
  await adapter.createSession({ sessionToken, userId: user.id, expires });
  setCookie(c, "sessionToken", sessionToken, {
    expires,
    httpOnly: true,
    secure: process$1.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/"
  });
  return c.json({ user });
});
app.post("/api/auth/signout", async (c) => {
  const sessionToken = getCookie(c, "sessionToken");
  if (sessionToken) {
    await adapter.deleteSession(sessionToken);
  }
  deleteCookie(c, "sessionToken", { path: "/" });
  return c.json({ success: true });
});
app.get("/api/auth/session", async (c) => {
  const sessionToken = getCookie(c, "sessionToken");
  if (!sessionToken) return c.json({ user: null });
  const sessionAndUser = await adapter.getSessionAndUser(sessionToken);
  if (!sessionAndUser) {
    deleteCookie(c, "sessionToken", { path: "/" });
    return c.json({ user: null });
  }
  if (sessionAndUser.session.expires < /* @__PURE__ */ new Date()) {
    await adapter.deleteSession(sessionToken);
    deleteCookie(c, "sessionToken", { path: "/" });
    return c.json({ user: null });
  }
  return c.json({ user: sessionAndUser.user });
});
app.post("/api/join-application", async (c) => {
  try {
    const body = await c.req.json();
    const { fullName, email, phoneNumber, status, otherStatus, institution, message, consentGiven } = body;
    const customStatus = typeof otherStatus === "string" ? otherStatus.trim() : "";
    const recordedStatus = status === "Other" ? `Other: ${customStatus}` : status;
    if (!fullName || !email || !phoneNumber || !status || consentGiven !== true || status === "Other" && !customStatus || !institution && status !== "Other" && status !== "Unemployed" || !message) {
      return c.json({ error: "All fields are required" }, 400);
    }
    if (!process$1.env.RESEND_API_KEY) {
      return c.json({ error: "Conference pass email is not configured. Please contact YEMC before registering." }, 503);
    }
    const appBaseUrl = process$1.env.NODE_ENV === "production" ? process$1.env.APP_URL?.replace(/\/+$/, "") : new URL(c.req.url).origin;
    if (!appBaseUrl || process$1.env.NODE_ENV === "production" && !appBaseUrl.startsWith("https://")) {
      return c.json({ error: "The public HTTPS app URL is not configured for conference passes." }, 503);
    }
    const qrToken = crypto.randomBytes(32).toString("base64url");
    const passUrl = `${appBaseUrl}/scan/${qrToken}`;
    const stmt = db.prepare(`
      INSERT INTO join_applications (fullName, email, phoneNumber, status, institution, message, consentGiven, consentGivenAt, qrToken)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
    `);
    const insertResult = stmt.run(fullName, email, phoneNumber, recordedStatus, institution, message, consentGiven ? 1 : 0, qrToken);
    try {
      const qrImage = await QRCode.toBuffer(passUrl, {
        errorCorrectionLevel: "H",
        margin: 2,
        type: "png",
        width: 420
      });
      const safeName = String(fullName).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]);
      await sendEmail({
        to: email,
        subject: "Your YEMC 2026 Conference Pass",
        html: `
          <h1>Your YEMC 2026 Conference Pass</h1>
          <p>Hello ${safeName},</p>
          <p>Your registration is confirmed. Present this unique QR pass at the conference entrance on Saturday, 24th October 2026.</p>
          <p><strong>Venue:</strong> Palms by Eagles (formerly Holiday Inn)</p>
          <p><strong>Theme:</strong> AI for the next Gen of career and business executives</p>
          <p><img src="cid:yemc2026pass" alt="Your unique YEMC conference entry QR code" width="320" height="320" /></p>
          <p>Keep this pass private. Scanning it at the entrance confirms your check-in.</p>
          <p>Best regards,<br />The YEMC Team</p>
        `,
        text: `Your YEMC 2026 Conference Pass

Hello ${fullName},
Your registration is confirmed. Present the attached unique QR pass at the conference entrance on Saturday, 24th October 2026.
Venue: Palms by Eagles (formerly Holiday Inn)
Theme: AI for the next Gen of career and business executives
Keep this pass private. Scanning it at the entrance confirms your check-in.

The QR code is attached as yemc-2026-pass.png.

Best regards, The YEMC Team`,
        attachments: [{
          filename: "yemc-2026-pass.png",
          content: qrImage.toString("base64"),
          contentId: "yemc2026pass"
        }]
      });
    } catch (emailError) {
      db.prepare("DELETE FROM join_applications WHERE id = ? AND qrToken = ?").run(insertResult.lastInsertRowid, qrToken);
      console.error("Failed to send YEMC conference pass:", emailError);
      return c.json({ error: "Your registration could not be completed because the conference pass email could not be sent. Please try again later." }, 502);
    }
    return c.json({ success: true }, 201);
  } catch (error) {
    return c.json({ error: error.message || "Failed to submit application" }, 500);
  }
});
app.post("/api/conference-pass/:token/check-in", async (c) => {
  try {
    const token = c.req.param("token");
    if (!/^[A-Za-z0-9_-]{43}$/.test(token)) {
      return c.json({ error: "Invalid conference pass" }, 404);
    }
    const checkIn = db.prepare(`
      UPDATE join_applications
      SET checkedInAt = CURRENT_TIMESTAMP
      WHERE qrToken = ? AND checkedInAt IS NULL
    `).run(token);
    const attendee = db.prepare(`
      SELECT fullName, email, phoneNumber, status, institution, checkedInAt
      FROM join_applications
      WHERE qrToken = ?
    `).get(token);
    if (!attendee) {
      return c.json({ error: "Invalid conference pass" }, 404);
    }
    const confirmation = {
      valid: true,
      alreadyCheckedIn: checkIn.changes === 0,
      fullName: attendee.fullName,
      email: attendee.email,
      phoneNumber: attendee.phoneNumber,
      checkedInAt: attendee.checkedInAt
    };
    if (attendee.status !== "Unemployed" && attendee.institution) {
      confirmation.institution = attendee.institution;
    }
    return c.json(confirmation);
  } catch (error) {
    console.error("Failed to validate YEMC conference pass:", error);
    return c.json({ error: "Unable to validate conference pass" }, 500);
  }
});
app.get("/api/applications/list", async (c) => {
  const searchQuery = c.req.query("search");
  let applications = [];
  try {
    if (searchQuery) {
      const stmt = db.prepare(`
        SELECT id, fullName as full_name, email, phoneNumber as phone, status, institution, message, consentGiven as consent_given, consentGivenAt as consent_given_at, createdAt as created_at 
        FROM join_applications 
        WHERE fullName LIKE ? OR email LIKE ? OR phoneNumber LIKE ? 
        ORDER BY createdAt DESC
      `);
      const searchPattern = `%${searchQuery}%`;
      applications = stmt.all(searchPattern, searchPattern, searchPattern);
    } else {
      const stmt = db.prepare("SELECT id, fullName as full_name, email, phoneNumber as phone, status, institution, message, consentGiven as consent_given, consentGivenAt as consent_given_at, createdAt as created_at FROM join_applications ORDER BY createdAt DESC");
      applications = stmt.all();
    }
    return c.json({ applications, total: applications.length });
  } catch (error) {
    return c.json({ error: error.message || "Failed to fetch applications" }, 500);
  }
});
app.delete("/api/applications/delete", async (c) => {
  try {
    const body = await c.req.json();
    if (!body.id) return c.json({ error: "ID is required" }, 400);
    const stmt = db.prepare("DELETE FROM join_applications WHERE id = ?");
    stmt.run(body.id);
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: error.message || "Failed to delete application" }, 500);
  }
});
app.all("/integrations/:path{.+}", async (c, next) => {
  const queryParams = c.req.query();
  const url = `${process$1.env.NEXT_PUBLIC_CREATE_BASE_URL ?? "https://www.create.xyz"}/integrations/${c.req.param("path")}${Object.keys(queryParams).length > 0 ? `?${new URLSearchParams(queryParams).toString()}` : ""}`;
  return proxy(url, {
    method: c.req.method,
    body: c.req.raw.body ?? null,
    duplex: "half",
    redirect: "manual",
    headers: {
      ...c.req.header(),
      "X-Forwarded-For": process$1.env.NEXT_PUBLIC_CREATE_HOST,
      "x-createxyz-host": process$1.env.NEXT_PUBLIC_CREATE_HOST,
      Host: process$1.env.NEXT_PUBLIC_CREATE_HOST,
      "x-createxyz-project-group-id": process$1.env.NEXT_PUBLIC_PROJECT_GROUP_ID
    }
  });
});
app.route(API_BASENAME, api);
const index = createHonoServer({
  app,
  defaultLogger: false
});

export { fetchWithHeaders as f, index as i };
