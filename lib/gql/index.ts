import { applyGraphQL } from "https://deno.land/x/oak_graphql@0.6.4/mod.ts";
import { Router } from "@oak/oak";
import typeDefs from "./typeDef/index.ts";
import path from "../../config/path.ts";
import resolvers from "./resolver/index.ts";
import { verifyJWT } from "../../utils/jwt.ts";



const GraphQLService = await applyGraphQL({
  Router,
  path: path.ROOT.GQL,
  typeDefs,
  resolvers,
  context: async (req: any) => {
    try {
      const cookieHeader = req?.request?.headers?.get("Cookie");
      console.log("Cookie header received:", cookieHeader);

      let token = null;
      if (cookieHeader) {
        const match = cookieHeader.match(/token=([^;]+)/);
        if (match) {
          token = match[1];
        }
      }

      if (!token) {
        const authHeader = req?.request?.headers?.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
          token = authHeader.split("Bearer ")[1];
        }
      }

      if (token) {
        const user = await verifyJWT(token);
        if (!user) return { error: "Invalid or expired token" };

        return { user }; // verified user
      } else return null;

    } catch (error) {
      return { error: "Invalid or expired token" };
    }
  }
});
export default GraphQLService;
console.log("🚀 Server running on http://localhost:8000/gql");
