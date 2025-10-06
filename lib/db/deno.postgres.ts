import { Client } from "jsr:@db/postgres";

const client = new Client({
  user: "postgres.pyoaowwarxwvraghsvpz",
  password: "Devabdul39",
  database: "postgres",
  hostname: "aws-1-ap-southeast-1.pooler.supabase.com",
  port: 6543,
});
await client.connect();

console.log("✅ Postgres connected ");
export default client;

