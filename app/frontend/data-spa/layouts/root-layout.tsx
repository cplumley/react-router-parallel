import { Link, Outlet } from "react-router"
import { useAuth } from "../lib/auth-context"
import { apiFetch } from "../lib/api"

export function RootLayout() {
  const { user, setUser } = useAuth()

  async function handleSignOut() {
    await apiFetch("/api/session", { method: "DELETE" })
    setUser(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-navy text-cream">
        <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-terracotta flex items-center justify-center text-white font-display font-bold text-lg leading-none">L</div>
            <span className="font-display text-xl font-semibold tracking-tight text-cream group-hover:text-terracotta-light transition-colors">Lisbon</span>
          </Link>
          <div className="flex items-center gap-6 font-body text-sm">
            {user ? (
              <>
                <span className="text-sand font-light">{user.name}</span>
                <Link to="/account" className="text-sand-dark hover:text-white transition-colors">Profile</Link>
                <button onClick={handleSignOut} className="text-sand-dark hover:text-white transition-colors cursor-pointer">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="text-sand-dark hover:text-white transition-colors">Sign In</Link>
                <Link to="/sign-up" className="bg-terracotta text-white px-5 py-2 rounded-lg font-medium hover:bg-terracotta-dark transition-colors">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t-4 azulejo-border mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="font-body text-stone text-sm tracking-wide">Built with Rails, Vite & warmth from Lisboa</p>
        </div>
      </footer>
    </div>
  )
}
