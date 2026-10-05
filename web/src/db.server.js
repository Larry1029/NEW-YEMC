import { neonConfig, Pool } from "@neondatabase/serverless";
import WebSocket from "ws";

neonConfig.webSocketConstructor = WebSocket;

let pool;

export function getDatabasePool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  pool ??= new Pool({ connectionString: process.env.DATABASE_URL });
  return pool;
}
