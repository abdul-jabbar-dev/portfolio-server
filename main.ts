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
      "https://abduljabbar.netlify.app",
    ],
    allowedHeaders: ["Content-Type", "Cookie", "Authorization"],
    exposedHeaders: ["Content-Length", "Date", "Cookie"],
    credentials: true,
  }),
);

app.use(router.routes(), router.allowedMethods());

const port = 8000;

console.log(`Server starting on port ${port}`);

Deno.serve(
  { port },
  async (req, info) => {
    const response = await app.handle(req, info.remoteAddr);
    return response ?? new Response("No response", { status: 500 });
  },
);