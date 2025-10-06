import { Router } from "@oak/oak";
import GraphQLService from "../lib/gql/index.ts";

const router = new Router();

router.use(
  async (ctx, next) => {
    if (ctx.request.hasBody) {
      const body = ctx.request.body({ type: "json" });
      const value = await body.value; 
      ctx.state.body = value;
    } else {
      console.log("❌ No body found");
    }
    await next();
  },
  GraphQLService.routes(),
  GraphQLService.allowedMethods()
);

export default router;
