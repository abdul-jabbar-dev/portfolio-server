import { Router } from "@oak/oak";
import GraphQLService from "../lib/gql/index.ts";

const router = new Router();

router.use(async (ctx, next) => {
  
  const cookieHeader = ctx.request.headers.get("cookie") || "";
  ctx.state.cookieHeader = cookieHeader;
 
  if (ctx.request.hasBody) {
    try {
      const body = ctx.request.body({ type: "json" });
      ctx.state.body = await body.value;
    } catch (error) { 
      ctx.state.body = null;
    }
  }
 
  await next();
}, GraphQLService.routes(), GraphQLService.allowedMethods());

export default router;