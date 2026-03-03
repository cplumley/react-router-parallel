import { type RouteConfig, index, route, layout } from "@react-router/dev/routes"

export default [
  layout("../data/layouts/root-layout.tsx", [
    index("../data/pages/home.tsx"),
    route("sign-in", "../data/pages/sign-in.tsx"),
    route("sign-up", "../data/pages/sign-up.tsx"),
    route("forgot-password", "../data/pages/forgot-password.tsx"),
    route("account", "../data/pages/account.tsx"),
  ]),
] satisfies RouteConfig
