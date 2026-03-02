import { createBrowserRouter } from "react-router"
import { RootLayout } from "./layouts/root-layout"
import { Home } from "./pages/home"
import { SignIn } from "./pages/sign-in"
import { SignUp } from "./pages/sign-up"
import { ForgotPassword } from "./pages/forgot-password"
import { Account } from "./pages/account"

export function createRouter() {
  return createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        { index: true, Component: Home },
        { path: "sign-in", Component: SignIn },
        { path: "sign-up", Component: SignUp },
        { path: "forgot-password", Component: ForgotPassword },
        { path: "account", Component: Account },
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
