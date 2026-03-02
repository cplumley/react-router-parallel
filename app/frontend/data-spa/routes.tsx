import { createBrowserRouter } from "react-router"
import { RootLayout } from "./layouts/root-layout"

export function createRouter() {
  return createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        { index: true, lazy: () => import("./pages/home").then(m => ({ Component: m.default })) },
        { path: "sign-in", lazy: () => import("./pages/sign-in").then(m => ({ Component: m.default })) },
        { path: "sign-up", lazy: () => import("./pages/sign-up").then(m => ({ Component: m.default })) },
        { path: "forgot-password", lazy: () => import("./pages/forgot-password").then(m => ({ Component: m.default })) },
        { path: "account", lazy: () => import("./pages/account").then(m => ({ Component: m.default })) },
      ],
    },
  ])
}

export type ServerUser = {
  id: number
  email: string
  first_name: string
  last_name: string
  name: string
}
