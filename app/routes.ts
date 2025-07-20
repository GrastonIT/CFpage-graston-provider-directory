import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  layout("routes/mainLayout.tsx", [
    route("/home", "routes/home.tsx"),
    route("/about", "routes/about.tsx"),
    route("/providers", "routes/providers.tsx"),
    route("/providers-enhanced", "routes/providersEnhanced.tsx"),
    route("/provider/:id", "routes/provider.$id.tsx"),
  ]),
] satisfies RouteConfig;
