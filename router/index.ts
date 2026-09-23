import { Router } from "@oak/oak";
import GraphQLService from "../lib/gql/index.ts";

const router = new Router();

// Health check endpoint for Deno Deploy
router.get("/", (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = "OK";
});

router.use(async (ctx, next) => {
  const cookieHeader = ctx.request.headers.get("cookie") || "";
  ctx.state.cookieHeader = cookieHeader;

  // Monkey patch for oak_graphql using Proxy to safely override ctx.request
  const originalRequest = ctx.request;
  const proxyRequest = new Proxy(originalRequest, {
    get(target, prop, receiver) {
      if (prop === "body") {
        return function(opts?: any) {
          return { value: Promise.resolve(ctx.state.body) };
        };
      }
      const value = Reflect.get(target, prop, receiver);
      return typeof value === "function" ? value.bind(target) : value;
    }
  });

  Object.defineProperty(ctx, "request", {
    get() { return proxyRequest; },
    configurable: true
  });
 
  if (ctx.request.hasBody) {
    const contentType = ctx.request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
       // skip body parsing for form-data in global middleware
    } else {
      try {
        const body = ctx.request.body({ type: "json" });
        ctx.state.body = await body.value;
      } catch (error) { 
        ctx.state.body = null;
      }
    }
  }
 
  await next();
});
router.use(async (ctx, next) => {
  console.log("METHOD:", ctx.request.method);
  console.log("URL:", ctx.request.url);
  console.log("BODY TYPE:", typeof ctx.request.body);
  console.log("HAS BODY:", ctx.request.hasBody);

  await next();
});
router.post("/upload", async (ctx) => {
  try {
    const body = ctx.request.body({ type: "form-data" });
    const formData = await body.value.read();
    
    if (!formData.files || formData.files.length === 0) {
      ctx.response.status = 400;
      ctx.response.body = { error: "No file uploaded" };
      return;
    }

    const file = formData.files[0];
    const folder = formData.fields ? formData.fields["folder"] : undefined;
    let content = file.content;
    if (!content && file.filename) {
      // It was written to a temp file on disk
      content = await Deno.readFile(file.filename);
    }
    
    if (!content) {
      ctx.response.status = 400;
      ctx.response.body = { error: "File content is empty" };
      return;
    }

    // Dynamic import to avoid circular dependencies or weird oak bundling issues
    const { uploadImageToS3 } = await import("../lib/s3.ts");
    
    const imageUrl = await uploadImageToS3(
      content, 
      file.originalName || "upload.png", 
      file.contentType || "image/png",
      "portfolio",
      folder
    );

    const { default: db } = await import("../db/index.ts");
    const { documents } = await import("../drizzle/schema.ts");

    await db.insert(documents).values({
      title: file.originalName || "upload",
      fileUrl: imageUrl,
    });

    ctx.response.status = 200;
    ctx.response.body = { url: imageUrl };
  } catch (error: any) {
    console.error("Upload Error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Upload failed", details: error.message, stack: error.stack };
  }
});

router.use(GraphQLService.routes(), GraphQLService.allowedMethods());

export default router;