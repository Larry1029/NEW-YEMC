import 'dotenv/config';
import { AsyncLocalStorage } from 'node:async_hooks';
import process from 'node:process';
import nodeConsole from 'node:console';
import { hash, verify } from 'argon2';
import { Hono } from 'hono';
import { contextStorage, getContext } from 'hono/context-storage';
import { cors } from 'hono/cors';
import { proxy } from 'hono/proxy';
import { bodyLimit } from 'hono/body-limit';
import { requestId } from 'hono/request-id';
import { createHonoServer } from 'react-router-hono-server/aws-lambda';
import { serializeError } from 'serialize-error';
import AppAdapter from './adapter';
import { getHTMLForErrorPage } from './get-html-for-error-page';
import { API_BASENAME, api } from './route-builder';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import crypto from 'node:crypto';
import QRCode from 'qrcode';
import { sendEmail } from '../src/app/api/utils/send-email.js';
import { getDatabasePool } from '../src/db.server.js';

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

const adapter = AppAdapter();

const app = new Hono();

function formatRegistrationNumber(id: string | number | bigint, qrToken: string): string {
  const randomPrefix = (crypto.createHash('sha256').update(qrToken).digest().readUInt32BE(0) % 9000) + 1000;
  return `YEMC-2026-${randomPrefix}${String(id).padStart(2, '0')}`;
}

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
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return c.json({ error: 'Invalid application payload' }, 400);
    }
    const { fullName, email, phoneNumber, status, otherStatus, institution, message, consentGiven } = body;
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const customStatus = typeof otherStatus === 'string' ? otherStatus.trim() : '';
    const recordedStatus = status === 'Other' ? `Other: ${customStatus}` : status;

    if (
      typeof fullName !== 'string' || !fullName.trim() ||
      !cleanEmail ||
      typeof phoneNumber !== 'string' || !phoneNumber.trim() ||
      typeof status !== 'string' || !status.trim() ||
      typeof message !== 'string' || !message.trim() ||
      consentGiven !== true ||
      (status === 'Other' && !customStatus) ||
      (!institution && status !== 'Other' && status !== 'Unemployed')
    ) {
      return c.json({ error: 'All fields are required' }, 400);
    }
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return c.json({ error: 'Enter a valid email address, like mailhere@gmail.com' }, 400);
    }
    if (!/^\d{10}$/.test(cleanPhone)) {
      return c.json({ error: 'Enter a valid 10-digit phone number' }, 400);
    }

    if (!process.env.RESEND_API_KEY) {
      return c.json({ error: 'Conference pass email is not configured. Please contact YEMC before registering.' }, 503);
    }

    const appBaseUrl = process.env.APP_URL?.replace(/\/+$/, '');
    if (!appBaseUrl) {
      return c.json({ error: 'The public app URL is not configured for conference passes.' }, 503);
    }
    if (process.env.NODE_ENV === 'production' && !appBaseUrl.startsWith('https://')) {
      return c.json({ error: 'The public HTTPS app URL is not configured for conference passes.' }, 503);
    }

    const qrToken = crypto.randomBytes(32).toString('base64url');
    const passUrl = `${appBaseUrl}/scan/${qrToken}`;
    const insertResult = await getDatabasePool().query(
      `INSERT INTO applications (
         full_name, email, phone, status, institution, message,
         consent_given, consent_given_at, qr_token
       ) VALUES ($1, $2, $3, $4, $5, $6, TRUE, CURRENT_TIMESTAMP, $7)
       RETURNING id`,
      [fullName.trim(), cleanEmail, cleanPhone, recordedStatus, institution || null, message.trim(), qrToken],
    );
    const applicationId = insertResult.rows[0].id;

    try {
      const qrImage = await QRCode.toBuffer(passUrl, {
        errorCorrectionLevel: 'H',
        margin: 2,
        type: 'png',
        width: 420,
      });
      const safeName = fullName.trim().replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character]!);
      const registrationNumber = formatRegistrationNumber(applicationId, qrToken);

      await sendEmail({
        to: cleanEmail,
        subject: 'Your YEMC 2026 Conference Pass',
        html: `
          <!doctype html>
          <html lang="en">
            <body style="margin:0;padding:0;background-color:#f3f0f8;color:#241b2f;font-family:Arial,Helvetica,sans-serif;">
              <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your YEMC 2026 conference registration is confirmed. Your pass is inside.</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f0f8;">
                <tr>
                  <td align="center" style="padding:32px 16px;">
                    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
                      <tr>
                        <td style="padding:0 0 24px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="48" height="48" align="center" valign="middle" style="width:48px;height:48px;border-radius:50%;background-color:#7139a8;color:#ffffff;font-size:26px;font-weight:bold;">Y</td>
                              <td style="padding-left:13px;color:#2c2039;font-size:18px;font-weight:bold;">Young Executive Master Class<br /><span style="color:#766983;font-size:12px;font-weight:normal;letter-spacing:1px;">YEMC 2026</span></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 22px;">
                          <p style="margin:0 0 10px;color:#49365a;font-size:16px;">Hello ${safeName},</p>
                          <h1 style="margin:0 0 12px;color:#241b2f;font-size:28px;line-height:1.2;">Your registration is confirmed</h1>
                          <p style="margin:0;color:#5d5266;font-size:15px;line-height:1.6;">Keep this email and present the pass below at the conference entrance on Saturday, November 7, 2026.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="border:2px dashed #8c62b0;border-radius:12px;background-color:#ffffff;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center" style="padding:24px 20px 12px;color:#7139a8;font-size:12px;font-weight:bold;letter-spacing:2px;">CONFERENCE PASS</td>
                            </tr>
                            <tr>
                              <td align="center" style="padding:0 20px 8px;color:#241b2f;font-size:24px;font-weight:bold;">YEMC 2026</td>
                            </tr>
                            <tr>
                              <td align="center" style="padding:12px 20px 20px;"><img src="cid:yemc2026pass" alt="Unique QR code for ${safeName}'s YEMC conference pass" width="200" height="200" style="display:block;width:200px;height:200px;border:0;" /></td>
                            </tr>
                            <tr>
                              <td style="padding:0 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e8e1ed;">
                                <tr><td style="padding:14px 0 10px;color:#766983;font-size:11px;font-weight:bold;letter-spacing:1px;">NAME</td><td align="right" style="padding:14px 0 10px;color:#241b2f;font-size:14px;font-weight:bold;">${safeName}</td></tr>
                                <tr><td style="padding:10px 0;color:#766983;font-size:11px;font-weight:bold;letter-spacing:1px;border-top:1px solid #eee9f1;">VENUE</td><td align="right" style="padding:10px 0;color:#241b2f;font-size:14px;border-top:1px solid #eee9f1;">Palms by Eagles<br />(formerly Holiday Inn)</td></tr>
                                <tr><td style="padding:10px 0;color:#766983;font-size:11px;font-weight:bold;letter-spacing:1px;border-top:1px solid #eee9f1;">DATE</td><td align="right" style="padding:10px 0;color:#241b2f;font-size:14px;border-top:1px solid #eee9f1;">Saturday, November 7, 2026</td></tr>
                                <tr><td style="padding:10px 0;color:#766983;font-size:11px;font-weight:bold;letter-spacing:1px;border-top:1px solid #eee9f1;">TIME</td><td align="right" style="padding:10px 0;color:#241b2f;font-size:14px;border-top:1px solid #eee9f1;">9:00 AM</td></tr>
                                <tr><td style="padding:10px 0 16px;color:#766983;font-size:11px;font-weight:bold;letter-spacing:1px;border-top:1px solid #eee9f1;">REGISTRATION NUMBER</td><td align="right" style="padding:10px 0 16px;color:#7139a8;font-size:14px;font-weight:bold;border-top:1px solid #eee9f1;">${registrationNumber}</td></tr>
                              </table></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding:20px 12px 0;color:#766983;font-size:13px;line-height:1.6;">Keep your QR pass private. It will be scanned at the entrance to confirm your check-in.<br />We look forward to seeing you there.<br /><strong style="color:#49365a;">The YEMC Team</strong></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
        text: `YEMC 2026 CONFERENCE PASS\n\nHello ${fullName},\nYour registration is confirmed. Present your unique QR pass at the conference entrance.\n\nNAME: ${fullName}\nVENUE: Palms by Eagles (formerly Holiday Inn)\nDATE: Saturday, November 7, 2026\nTIME: 9:00 AM\nREGISTRATION NUMBER: ${registrationNumber}\n\nKeep this pass private. Scanning it at the entrance confirms your check-in. The QR code is attached as yemc-2026-pass.png.\n\nWe look forward to seeing you there.\nThe YEMC Team`,
        attachments: [{
          filename: 'yemc-2026-pass.png',
          content: qrImage.toString('base64'),
          contentId: 'yemc2026pass',
        }],
      });
    } catch (emailError) {
      console.error('Failed to send YEMC conference pass:', emailError);
      try {
        await getDatabasePool().query(
          'DELETE FROM applications WHERE id = $1 AND qr_token = $2',
          [applicationId, qrToken],
        );
      } catch (cleanupError) {
        console.error('Failed to remove registration after email failure:', cleanupError);
        return c.json({ error: 'The conference pass email could not be sent. Please contact YEMC before registering again.' }, 500);
      }
      return c.json({ error: 'Your registration could not be completed because the conference pass email could not be sent. Please try again later.' }, 502);
    }

    return c.json({ success: true }, 201);
  } catch (error: any) {
    console.error('Failed to submit YEMC conference registration:', error);
    return c.json({ error: 'Failed to submit application' }, 500);
  }
});

app.post('/api/conference-pass/:token/check-in', async (c) => {
  try {
    const token = c.req.param('token');
    if (!/^[A-Za-z0-9_-]{43}$/.test(token)) {
      return c.json({ error: 'Invalid conference pass' }, 404);
    }

    const result = await getDatabasePool().query(
      `WITH checked_in AS (
         UPDATE applications
         SET checked_in_at = CURRENT_TIMESTAMP
         WHERE qr_token = $1 AND checked_in_at IS NULL
         RETURNING id, full_name, email, phone, status, institution, checked_in_at
       )
       SELECT id, full_name, email, phone, status, institution, checked_in_at,
              FALSE AS already_checked_in
       FROM checked_in
       UNION ALL
       SELECT id, full_name, email, phone, status, institution, checked_in_at,
              TRUE AS already_checked_in
       FROM applications
       WHERE qr_token = $1 AND checked_in_at IS NOT NULL
         AND NOT EXISTS (SELECT 1 FROM checked_in)
       LIMIT 1`,
      [token],
    );
    const attendee = result.rows[0] as {
      id: string | number | bigint;
      full_name: string;
      email: string;
      phone: string;
      status: string;
      institution: string | null;
      checked_in_at: string | null;
      already_checked_in: boolean;
    } | undefined;

    if (!attendee) {
      return c.json({ error: 'Invalid conference pass' }, 404);
    }

    const confirmation: Record<string, unknown> = {
      valid: true,
      alreadyCheckedIn: attendee.already_checked_in,
      registrationNumber: formatRegistrationNumber(attendee.id, token),
      fullName: attendee.full_name,
      email: attendee.email,
      phoneNumber: attendee.phone,
      checkedInAt: attendee.checked_in_at,
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
  try {
    const searchPattern = searchQuery ? `%${searchQuery}%` : null;
    const [applicationResult, countResult] = await Promise.all([
      getDatabasePool().query(
        `SELECT id, full_name, email, phone, status, institution, message,
                consent_given, consent_given_at, created_at
         FROM applications
         WHERE $1::text IS NULL OR full_name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1
         ORDER BY created_at DESC`,
        [searchPattern],
      ),
      getDatabasePool().query(
        `SELECT COUNT(*) AS total
         FROM applications
         WHERE $1::text IS NULL OR full_name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1`,
        [searchPattern],
      ),
    ]);
    return c.json({
      applications: applicationResult.rows,
      total: Number(countResult.rows[0].total),
    });
  } catch (error: any) {
    console.error('Failed to fetch YEMC applications:', error);
    return c.json({ error: 'Failed to fetch applications' }, 500);
  }
});

app.delete('/api/applications/delete', async (c) => {
  try {
    const body = await c.req.json();
    if (!body.id) return c.json({ error: 'ID is required' }, 400);

    await getDatabasePool().query('DELETE FROM applications WHERE id = $1', [body.id]);
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete YEMC application:', error);
    return c.json({ error: 'Failed to delete application' }, 500);
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
