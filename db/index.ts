import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { heroSection } from "./schema.ts";
import "https://deno.land/std@0.203.0/dotenv/load.ts";
const { Pool } = pg;

const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
  schema: {
    heroSection: heroSection,
  },
});
export default db;
