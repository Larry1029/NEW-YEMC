import Database from 'better-sqlite3';

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
`);

console.log('Database initialized successfully in local.db');
