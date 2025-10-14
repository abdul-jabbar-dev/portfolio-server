import { Application } from "@oak/oak";
import router from "./router/index.ts";
import "https://deno.land/std@0.203.0/dotenv/load.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.1/mod.ts";
import client from './lib/db/deno.postgres.ts';

const app = new Application();
app.use(
    oakCors({
      origin: "*"
    }),
);


await client.connect();

app.use(router.routes(), router.allowedMethods());
app.listen({ port: 8000 });
console.log("Server running on http://localhost:8000");
