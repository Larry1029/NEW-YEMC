import "dotenv/config";
import { readdir, readFile } from "node:fs/promises";
import { getDatabasePool } from "../src/db.server.js";

const migrationsDirectory = new URL("../migrations/", import.meta.url);
const migrations = (await readdir(migrationsDirectory))
  .filter((file) => file.endsWith(".sql"))
  .sort();
const pool = getDatabasePool();

try {
  for (const migration of migrations) {
    const contents = await readFile(new URL(migration, migrationsDirectory), "utf8");
    await pool.query(contents);
  }
  console.log("PostgreSQL schema migration completed.");
} finally {
  await pool.end();
}
