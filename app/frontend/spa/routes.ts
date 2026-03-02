import { type RouteConfig, index, route, layout } from "@react-router/dev/routes"

export default [
  layout("../data-spa/layouts/root-layout.tsx", [
    index("../data-spa/pages/home.tsx"),
    route("sign-in", "../data-spa/pages/sign-in.tsx"),
    route("sign-up", "../data-spa/pages/sign-up.tsx"),
    route("forgot-password", "../data-spa/pages/forgot-password.tsx"),
    route("account", "../data-spa/pages/account.tsx"),
  ]),
] satisfies RouteConfig
