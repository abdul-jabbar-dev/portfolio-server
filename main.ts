import { Application } from "@oak/oak";

import router from "./router/index.ts";
import "https://deno.land/std@0.203.0/dotenv/load.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.1/mod.ts";
import client from './lib/db/deno.postgres.ts';
const app = new Application();


app.use(
  oakCors({
    origin: [
      "http://localhost:3000",
      "https://abduljabbartech.me",
      "https://abduljabbar.netlify.app"
    ],
    allowedHeaders: ["Content-Type", "Cookie", "Authorization"],
    exposedHeaders: ["Content-Length", "Date", "Cookie"],
    credentials: true,
  }),

);

// Database is connected in lib/db/deno.postgres.ts, no need to connect again here.

app.use(router.routes(), router.allowedMethods());

const port = Number(Deno.env.get("PORT")) || 8000;
console.log(`Server running on port ${port}`);
await app.listen({ port });
