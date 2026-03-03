import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"
import type { Route } from "./+types/root"
import { AuthProvider } from "../data/lib/auth-context"
import { apiFetch } from "../data/lib/api"
import "../stylesheets/application.css"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export async function clientLoader() {
  try {
    const res = await apiFetch("/api/session")
    if (!res.ok) return { user: null }
    const data = await res.json()
    return { user: data.id ? data : null }
  } catch {
    return { user: null }
  }
}

export default function Root({ loaderData }: Route.ComponentProps) {
  return (
    <AuthProvider initialUser={loaderData.user}>
      <Outlet />
    </AuthProvider>
  )
}
