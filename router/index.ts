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

  // Monkey patch for oak_graphql which expects request.body to be a function
  const originalBody = ctx.request.body;
  ctx.state.originalBody = originalBody;
  if (typeof originalBody !== "function") {
    Object.defineProperty(ctx.request, 'body', {
      value: function(opts: any) {
        return {
          get value() {
            // Check if it's Oak v13+ where body has a json() function
            if (typeof (originalBody as any)?.json === "function") {
              return (originalBody as any).json().catch(() => null);
            }
            return Promise.resolve(null);
          }
        };
      },
      configurable: true
    });
  }
 
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

router.post("/upload", async (ctx) => {
  try {
    const originalBody = ctx.state.originalBody || ctx.request.body;
    const formData = await originalBody.formData();
    
    const file = formData.get("file");
    
    if (!file || typeof file === "string" || !file.arrayBuffer) {
      ctx.response.status = 400;
      ctx.response.body = { error: "No file uploaded" };
      return;
    }

    const folder = formData.get("folder") || "portfolio";
    const content = new Uint8Array(await file.arrayBuffer());
    
    if (!content || content.length === 0) {
      ctx.response.status = 400;
      ctx.response.body = { error: "File content is empty" };
      return;
    }

    // Dynamic import to avoid circular dependencies or weird oak bundling issues
    const { uploadImageToS3 } = await import("../lib/s3.ts");
    
    const imageUrl = await uploadImageToS3(
      content, 
      file.name || "upload.png", 
      file.type || "image/png",
      "portfolio",
      folder.toString()
    );

    const { default: db } = await import("../db/index.ts");
    const { documents } = await import("../drizzle/schema.ts");

    await db.insert(documents).values({
      title: file.name || "upload",
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