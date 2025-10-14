import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { heroSection } from "./schema.ts";
import "https://deno.land/std@0.203.0/dotenv/load.ts";
const { Pool } = pg;

const databaseUrl = Deno.env.get("DATABASE_URL") ?? "";
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in the environment");
}

const db = drizzle({
  client: new Pool({
    connectionString: databaseUrl,
  }),
  schema: {
    heroSection: heroSection,
  },
});
export default db;
