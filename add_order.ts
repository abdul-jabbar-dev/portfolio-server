import db from "./db/index.ts";
import "https://deno.land/std@0.203.0/dotenv/load.ts";
import pg from "pg";

const databaseUrl = Deno.env.get("DATABASE_URL") ?? "";
const pool = new pg.Pool({ connectionString: databaseUrl });

async function run() {
  try {
    await pool.query("ALTER TABLE projects ADD COLUMN \"order\" integer DEFAULT 0;");
    console.log("Success");
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
run();
