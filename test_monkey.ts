import { Router, Application } from "jsr:@oak/oak";
const app = new Application();
const router = new Router();
router.use(async (ctx, next) => {
  try {
    const originalRequest = ctx.request;
    const fakeRequest = Object.create(originalRequest);
    fakeRequest.body = function() { return { value: Promise.resolve({ query: "fake" }) }; };
    Object.defineProperty(ctx, "request", {
      get() { return fakeRequest; }
    });
    console.log(typeof ctx.request.body);
  } catch(e) {
    console.log("Error:", e);
  }
  ctx.response.body = "OK";
});
app.use(router.routes());
console.log("OK");
