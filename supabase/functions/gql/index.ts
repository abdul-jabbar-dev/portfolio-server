import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createSchema, createYoga } from "npm:graphql-yoga@5.0.0";
import typeDefs from "../../../lib/gql/typeDef/index.ts";
import resolvers from "../../../lib/gql/resolver/index.ts";
import { verifyJWT } from "../../../utils/jwt.ts";
import { uploadImageToS3 } from "../../../lib/s3.ts";
import db from "../../../db/index.ts";
import { documents } from "../../../drizzle/schema.ts";

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: '*', // allow any endpoint so Yoga doesn't return 404
  context: async (req: Request) => {
    try {
      const cookieHeader = req.headers.get("Cookie");
      let token = null;
      if (cookieHeader) {
        const match = cookieHeader.match(/token=([^;]+)/);
        if (match) {
          token = match[1];
        }
      }
      if (!token) {
        const authHeader = req.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
          token = authHeader.split("Bearer ")[1];
        }
      }
      if (token) {
        const user = await verifyJWT(token);
        if (!user) return { error: "Invalid or expired token" };
        return { user };
      }
      return null;
    } catch (error) {
      return { error: "Invalid or expired token" };
    }
  }
});

const allowedOrigins = [
  "http://localhost:3000",
  "https://abduljabbartech.me",
  "https://abduljabbar.netlify.app",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("Origin") || "";
  const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, cookie",
    "Access-Control-Allow-Credentials": "true",
  };
}

serve(async (req) => {
  const url = new URL(req.url);

  // CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: getCorsHeaders(req) });
  }

  // File Upload Route
  if (url.pathname.endsWith("/upload") && req.method === "POST") {
    try {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = formData.get("folder") as string | null;

      if (!file) {
        return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400, headers: getCorsHeaders(req) });
      }

      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);

      const imageUrl = await uploadImageToS3(
        bytes,
        file.name || "upload.png",
        file.type || "image/png",
        "portfolio",
        folder || undefined
      );

      await db.insert(documents).values({
        title: file.name || "upload",
        fileUrl: imageUrl,
      });

      return new Response(JSON.stringify({ url: imageUrl }), {
        status: 200,
        headers: { ...getCorsHeaders(req), "Content-Type": "application/json" }
      });
    } catch (error: any) {
      console.error("Upload Error:", error);
      return new Response(JSON.stringify({ error: "Upload failed", details: error.message }), {
        status: 500,
        headers: { ...getCorsHeaders(req), "Content-Type": "application/json" }
      });
    }
  }

  // GraphQL Route
  const response = await yoga(req);
  
  // Append CORS headers to Yoga response
  const headers = new Headers(response.headers);
  const corsHeaders = getCorsHeaders(req);
  for (const [key, value] of Object.entries(corsHeaders)) {
    headers.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}, { port: 54321 });
