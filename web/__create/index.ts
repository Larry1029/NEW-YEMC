import 'dotenv/config';
import { AsyncLocalStorage } from 'node:async_hooks';
import process from 'node:process';
import nodeConsole from 'node:console';
import Database from 'better-sqlite3';
import { hash, verify } from 'argon2';
import { Hono } from 'hono';
import { contextStorage, getContext } from 'hono/context-storage';
import { cors } from 'hono/cors';
import { proxy } from 'hono/proxy';
import { bodyLimit } from 'hono/body-limit';
import { requestId } from 'hono/request-id';
import { createHonoServer } from 'react-router-hono-server/node';
import { serializeError } from 'serialize-error';
import AppAdapter from './adapter';
import { getHTMLForErrorPage } from './get-html-for-error-page';
import { API_BASENAME, api } from './route-builder';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import crypto from 'node:crypto';
import QRCode from 'qrcode';
import { sendEmail } from '../src/app/api/utils/send-email.js';

const als = new AsyncLocalStorage<{ requestId: string }>();

for (const method of ['log', 'info', 'warn', 'error', 'debug'] as const) {
  const original = nodeConsole[method].bind(console);

  console[method] = (...args: unknown[]) => {
    const requestId = als.getStore()?.requestId;
    if (requestId) {
      original(`[traceId:${requestId}]`, ...args);
    } else {
      original(...args);
    }
  };
}

const db = new Database('local.db');

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

const joinApplicationColumns = db.prepare('PRAGMA table_info(join_applications)').all() as Array<{ name: string }>;
if (!joinApplicationColumns.some((column) => column.name === 'consentGiven')) {
  db.exec('ALTER TABLE join_applications ADD COLUMN consentGiven INTEGER NOT NULL DEFAULT 0');
}
if (!joinApplicationColumns.some((column) => column.name === 'consentGivenAt')) {
  db.exec('ALTER TABLE join_applications ADD COLUMN consentGivenAt DATETIME');
}
if (!joinApplicationColumns.some((column) => column.name === 'qrToken')) {
  db.exec('ALTER TABLE join_applications ADD COLUMN qrToken TEXT');
}
if (!joinApplicationColumns.some((column) => column.name === 'checkedInAt')) {
  db.exec('ALTER TABLE join_applications ADD COLUMN checkedInAt DATETIME');
}
db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_join_applications_qrToken ON join_applications(qrToken) WHERE qrToken IS NOT NULL');

const adapter = AppAdapter(db);

const app = new Hono();

app.use('*', requestId());

app.use('*', (c, next) => {
  const requestId = c.get('requestId');
  return als.run({ requestId }, () => next());
});

app.use(contextStorage());

app.onError((err, c) => {
  if (c.req.method !== 'GET') {
    return c.json(
      {
        error: 'An error occurred in your app',
        details: serializeError(err),
      },
      500
    );
  }
  return c.html(getHTMLForErrorPage(err), 200);
});

if (process.env.CORS_ORIGINS) {
  app.use(
    '/*',
    cors({
      origin: process.env.CORS_ORIGINS.split(',').map((origin: string) => origin.trim()),
    })
  );
}
app.post('/api/auth/signup', async (c) => {
  const rawBody = await c.req.raw.text();
  let body = {};

  if (rawBody) {
    try {
      body = JSON.parse(rawBody);
    } catch {
      return c.json({ error: 'Invalid JSON payload' }, 400);
    }
  }

  const { email, password, name } = body;
  if (!email || !password) return c.json({ error: 'Missing email or password' }, 400);

  const existingUser = await adapter.getUserByEmail(email);
  if (existingUser) return c.json({ error: 'User already exists' }, 400);

  const newUser = await adapter.createUser({
    emailVerified: null,
    email,
    name: typeof name === 'string' && name.length > 0 ? name : undefined,
  });

  await adapter.linkAccount!({
    extraData: { password: await hash(password) },
    type: 'credentials',
    userId: newUser.id,
    providerAccountId: newUser.id,
    provider: 'credentials',
  });

  const sessionToken = crypto.randomUUID();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  await adapter.createSession!({ sessionToken, userId: newUser.id, expires });

  setCookie(c, 'sessionToken', sessionToken, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/'
  });

  return c.json({ user: newUser });
});

app.post('/api/auth/signin', async (c) => {
  const body = await c.req.json();
  const { email, password } = body;
  if (!email || !password) return c.json({ error: 'Missing email or password' }, 400);

  const user = await adapter.getUserByEmail(email);
  if (!user) return c.json({ error: 'Invalid credentials' }, 400);

  const matchingAccount = user.accounts.find((acc: any) => acc.provider === 'credentials');
  if (!matchingAccount?.password) return c.json({ error: 'Invalid credentials' }, 400);

  const isValid = await verify(matchingAccount.password, password);
  if (!isValid) return c.json({ error: 'Invalid credentials' }, 400);

  const sessionToken = crypto.randomUUID();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await adapter.createSession!({ sessionToken, userId: user.id, expires });

  setCookie(c, 'sessionToken', sessionToken, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/'
  });

  return c.json({ user });
});

app.post('/api/auth/signout', async (c) => {
  const sessionToken = getCookie(c, 'sessionToken');
  if (sessionToken) {
    await adapter.deleteSession!(sessionToken);
  }
  deleteCookie(c, 'sessionToken', { path: '/' });
  return c.json({ success: true });
});

app.get('/api/auth/session', async (c) => {
  const sessionToken = getCookie(c, 'sessionToken');
  if (!sessionToken) return c.json({ user: null });

  const sessionAndUser = await adapter.getSessionAndUser!(sessionToken);
  if (!sessionAndUser) {
    deleteCookie(c, 'sessionToken', { path: '/' });
    return c.json({ user: null });
  }

  if (sessionAndUser.session.expires < new Date()) {
    await adapter.deleteSession!(sessionToken);
    deleteCookie(c, 'sessionToken', { path: '/' });
    return c.json({ user: null });
  }

  return c.json({ user: sessionAndUser.user });
});

app.post('/api/join-application', async (c) => {
  try {
    const body = await c.req.json();
    const { fullName, email, phoneNumber, status, otherStatus, institution, message, consentGiven } = body;
    const customStatus = typeof otherStatus === 'string' ? otherStatus.trim() : '';
    const recordedStatus = status === 'Other' ? `Other: ${customStatus}` : status;

    if (!fullName || !email || !phoneNumber || !status || consentGiven !== true || (status === 'Other' && !customStatus) || (!institution && status !== "Other" && status !== "Unemployed") || !message) {
      return c.json({ error: 'All fields are required' }, 400);
    }

    if (!process.env.RESEND_API_KEY) {
      return c.json({ error: 'Conference pass email is not configured. Please contact YEMC before registering.' }, 503);
    }

    const appBaseUrl = process.env.NODE_ENV === 'production'
      ? process.env.APP_URL?.replace(/\/+$/, '')
      : new URL(c.req.url).origin;
    if (!appBaseUrl || (process.env.NODE_ENV === 'production' && !appBaseUrl.startsWith('https://'))) {
      return c.json({ error: 'The public HTTPS app URL is not configured for conference passes.' }, 503);
    }

    const qrToken = crypto.randomBytes(32).toString('base64url');
    const passUrl = `${appBaseUrl}/scan/${qrToken}`;

    const stmt = db.prepare(`
      INSERT INTO join_applications (fullName, email, phoneNumber, status, institution, message, consentGiven, consentGivenAt, qrToken)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
    `);

    const insertResult = stmt.run(fullName, email, phoneNumber, recordedStatus, institution, message, consentGiven ? 1 : 0, qrToken);

    try {
      const qrImage = await QRCode.toBuffer(passUrl, {
        errorCorrectionLevel: 'H',
        margin: 2,
        type: 'png',
        width: 420,
      });
      const safeName = String(fullName).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character]!);

      await sendEmail({
        to: email,
        subject: 'Your YEMC 2026 Conference Pass',
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
        text: `Your YEMC 2026 Conference Pass\n\nHello ${fullName},\nYour registration is confirmed. Present the attached unique QR pass at the conference entrance on Saturday, 24th October 2026.\nVenue: Palms by Eagles (formerly Holiday Inn)\nTheme: AI for the next Gen of career and business executives\nKeep this pass private. Scanning it at the entrance confirms your check-in.\n\nThe QR code is attached as yemc-2026-pass.png.\n\nBest regards, The YEMC Team`,
        attachments: [{
          filename: 'yemc-2026-pass.png',
          content: qrImage.toString('base64'),
          contentId: 'yemc2026pass',
        }],
      });
    } catch (emailError) {
      db.prepare('DELETE FROM join_applications WHERE id = ? AND qrToken = ?').run(insertResult.lastInsertRowid, qrToken);
      console.error('Failed to send YEMC conference pass:', emailError);
      return c.json({ error: 'Your registration could not be completed because the conference pass email could not be sent. Please try again later.' }, 502);
    }

    return c.json({ success: true }, 201);
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to submit application' }, 500);
  }
});

app.post('/api/conference-pass/:token/check-in', async (c) => {
  try {
    const token = c.req.param('token');
    if (!/^[A-Za-z0-9_-]{43}$/.test(token)) {
      return c.json({ error: 'Invalid conference pass' }, 404);
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
    `).get(token) as {
      fullName: string;
      email: string;
      phoneNumber: string;
      status: string;
      institution: string | null;
      checkedInAt: string | null;
    } | undefined;

    if (!attendee) {
      return c.json({ error: 'Invalid conference pass' }, 404);
    }

    const confirmation: Record<string, unknown> = {
      valid: true,
      alreadyCheckedIn: checkIn.changes === 0,
      fullName: attendee.fullName,
      email: attendee.email,
      phoneNumber: attendee.phoneNumber,
      checkedInAt: attendee.checkedInAt,
    };
    if (attendee.status !== 'Unemployed' && attendee.institution) {
      confirmation.institution = attendee.institution;
    }

    return c.json(confirmation);
  } catch (error: any) {
    console.error('Failed to validate YEMC conference pass:', error);
    return c.json({ error: 'Unable to validate conference pass' }, 500);
  }
});

app.get('/api/applications/list', async (c) => {
  const searchQuery = c.req.query('search');
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
      const stmt = db.prepare('SELECT id, fullName as full_name, email, phoneNumber as phone, status, institution, message, consentGiven as consent_given, consentGivenAt as consent_given_at, createdAt as created_at FROM join_applications ORDER BY createdAt DESC');
      applications = stmt.all();
    }

    return c.json({ applications, total: applications.length });
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to fetch applications' }, 500);
  }
});

app.delete('/api/applications/delete', async (c) => {
  try {
    const body = await c.req.json();
    if (!body.id) return c.json({ error: 'ID is required' }, 400);

    const stmt = db.prepare('DELETE FROM join_applications WHERE id = ?');
    stmt.run(body.id);

    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to delete application' }, 500);
  }
});

app.all('/integrations/:path{.+}', async (c, next) => {
  const queryParams = c.req.query();
  const url = `${process.env.NEXT_PUBLIC_CREATE_BASE_URL ?? 'https://www.create.xyz'}/integrations/${c.req.param('path')}${Object.keys(queryParams).length > 0 ? `?${new URLSearchParams(queryParams).toString()}` : ''}`;

  return proxy(url, {
    method: c.req.method,
    body: c.req.raw.body ?? null,
    duplex: 'half',
    redirect: 'manual',
    headers: {
      ...c.req.header(),
      'X-Forwarded-For': process.env.NEXT_PUBLIC_CREATE_HOST,
      'x-createxyz-host': process.env.NEXT_PUBLIC_CREATE_HOST,
      Host: process.env.NEXT_PUBLIC_CREATE_HOST,
      'x-createxyz-project-group-id': process.env.NEXT_PUBLIC_PROJECT_GROUP_ID,
    },
  });
});

app.route(API_BASENAME, api);

export default createHonoServer({
  app,
  defaultLogger: false,
});
