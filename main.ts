import { Application } from "@oak/oak";

import router from "./router/index.ts";
import "https://deno.land/std@0.203.0/dotenv/load.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.1/mod.ts";
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
Deno.serve({ port: 8000 }, (req) => {
  const url = new URL(req.url);

  console.log(`${req.method} ${url.pathname}`);

  return new Response("DEPLOYMENT OK", {
    status: 200,
    headers: {
      "content-type": "text/plain",
    },
  });
});