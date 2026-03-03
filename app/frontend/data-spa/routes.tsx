import { createBrowserRouter } from "react-router"
import { RootLayout } from "./layouts/root-layout"

function convert(module: { default: React.ComponentType }) {
  return { Component: module.default }
}

export function createRouter() {
  return createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        { index: true, lazy: () => import("./pages/home").then(convert) },
        { path: "sign-in", lazy: () => import("./pages/sign-in").then(convert) },
        { path: "sign-up", lazy: () => import("./pages/sign-up").then(convert) },
        { path: "forgot-password", lazy: () => import("./pages/forgot-password").then(convert) },
        { path: "account", lazy: () => import("./pages/account").then(convert) },
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
