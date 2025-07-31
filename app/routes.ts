
import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/providers", "routes/providers.tsx"),
  route("/provider/:id", "routes/provider.$id.tsx"),
] satisfies RouteConfig;
