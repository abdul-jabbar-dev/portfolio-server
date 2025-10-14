
const ROOT = "/";
const GQL = "/gql";
const path = {
  ROOT_INDEX: ROOT,
  ROOT: {
    GQL,
  },
};


export const ENV = {
  DATABASE_URL: Deno.env.get("DATABASE_URL") || "DATABASE_URL not set",
  SALT: Deno.env.get("SALT") || "15",
  JWT_SECRET: Deno.env.get("JWT_SECRET")
};

export const DATABASE_URL = Deno.env.get("DATABASE_URL")

export default path;
