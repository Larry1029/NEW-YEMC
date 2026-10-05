import "dotenv/config";
import Database from "better-sqlite3";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getDatabasePool } from "../src/db.server.js";

const sqlitePath = new URL("../local.db", import.meta.url);
if (!existsSync(sqlitePath)) {
  throw new Error("web/local.db was not found; no legacy data was imported.");
}

const sqlite = new Database(fileURLToPath(sqlitePath), { readonly: true });
const pool = getDatabasePool();
let client;

try {
  client = await pool.connect();
  const users = sqlite.prepare("SELECT * FROM auth_users").all();
  const userIds = new Map();

  await client.query("BEGIN");
  try {
    for (const user of users) {
      const result = await client.query(
        `INSERT INTO auth_users (name, email, "emailVerified", image, created_at)
         VALUES ($1, $2, $3, $4, COALESCE($5, CURRENT_TIMESTAMP))
         ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
         RETURNING id`,
        [user.name, user.email, user.emailVerified, user.image, user.created_at],
      );
      userIds.set(String(user.id), result.rows[0].id);
    }

    for (const account of sqlite.prepare("SELECT * FROM auth_accounts").all()) {
      const userId = userIds.get(String(account.userId));
      if (!userId) continue;

      await client.query(
        `INSERT INTO auth_accounts (
           "userId", provider, type, "providerAccountId", access_token, expires_at,
           refresh_token, id_token, scope, session_state, token_type, password
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         ON CONFLICT (provider, "providerAccountId") DO UPDATE
         SET password = COALESCE(EXCLUDED.password, auth_accounts.password)`,
        [
          userId,
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
          account.password,
        ],
      );
    }

    for (const session of sqlite.prepare("SELECT * FROM auth_sessions").all()) {
      const userId = userIds.get(String(session.userId));
      if (!userId) continue;

      await client.query(
        `INSERT INTO auth_sessions ("userId", expires, "sessionToken")
         VALUES ($1, $2, $3)
         ON CONFLICT ("sessionToken") DO UPDATE SET
           "userId" = EXCLUDED."userId",
           expires = EXCLUDED.expires`,
        [userId, session.expires, session.sessionToken],
      );
    }

    for (const token of sqlite.prepare("SELECT * FROM auth_verification_token").all()) {
      await client.query(
        `INSERT INTO auth_verification_token (identifier, expires, token)
         VALUES ($1, $2, $3)
         ON CONFLICT (identifier, token) DO UPDATE SET expires = EXCLUDED.expires`,
        [token.identifier, token.expires, token.token],
      );
    }

    const registrations = sqlite.prepare("SELECT * FROM join_applications").all();
    for (const registration of registrations) {
      await client.query(
        `INSERT INTO applications (
           full_name, email, phone, status, institution, message, created_at,
           consent_given, consent_given_at, qr_token, checked_in_at, source_key
         ) VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, CURRENT_TIMESTAMP), $8, $9, $10, $11, $12)
         ON CONFLICT (source_key) DO NOTHING`,
        [
          registration.fullName,
          registration.email,
          registration.phoneNumber,
          registration.status,
          registration.institution,
          registration.message,
          registration.createdAt,
          Boolean(registration.consentGiven),
          registration.consentGivenAt,
          registration.qrToken,
          registration.checkedInAt,
          `local.db:join_applications:${registration.id}`,
        ],
      );
    }

    await client.query("COMMIT");
    console.log(
      `Imported ${users.length} users and ${registrations.length} conference registrations from local.db.`,
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
} finally {
  sqlite.close();
  client?.release();
  await pool.end();
}
