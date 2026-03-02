import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { createRouter, type ServerUser } from "./routes"
import { AuthProvider } from "./lib/auth-context"

type ServerProps = {
  current_user: ServerUser | null
  flash: { notice?: string; alert?: string }
}

export function mount(rootElement: HTMLElement) {
  const props: ServerProps = JSON.parse(rootElement.dataset.reactProps ?? "{}")
  const router = createRouter()

  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider initialUser={props.current_user}>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  )
}
