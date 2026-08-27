import { Client } from "jsr:@db/postgres";

const client = new Client({
  user: "postgres.pyoaowwarxwvraghsvpz",
  password: "Devabdul39",
  database: "postgres",
  hostname: "aws-1-ap-southeast-1.pooler.supabase.com",
  port: 6543,
  tls: { enabled: false },
});
try {
  await client.connect();
  console.log("✅ Postgres connected ");
}
catch (err) {
  console.log("❌ Database (Postgres) not connected, Checkout superbase/abdul-jabbar-dev/portfolio for setup, or check your env var ,your credentials, ", err);
}
export default client;

