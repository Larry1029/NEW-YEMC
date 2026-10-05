import "dotenv/config";
import { readFile } from "node:fs/promises";
import { getDatabasePool } from "../src/db.server.js";

const migrationUrl = new URL("../migrations/001_initial_schema.sql", import.meta.url);
const migration = await readFile(migrationUrl, "utf8");
const pool = getDatabasePool();

try {
  await pool.query(migration);
  console.log("PostgreSQL schema migration completed.");
} finally {
  await pool.end();
}
