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
    route("/providers", "routes/providers.tsx"),
  ]),
] satisfies RouteConfig;
