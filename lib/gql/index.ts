import { applyGraphQL } from "https://deno.land/x/oak_graphql@0.6.4/mod.ts";
import { Router } from "@oak/oak";
import typeDefs from "./typeDef/index.ts";
import path from "../../config/path.ts";
import resolvers from "./resolver/index.ts";



const GraphQLService = await applyGraphQL({
  Router,
  path: path.ROOT.GQL,
  typeDefs,
  resolvers,
});
export default GraphQLService;
console.log("🚀 Server running on http://localhost:8000/gql");
