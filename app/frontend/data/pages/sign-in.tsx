import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import { apiFetch } from "../lib/api"
import { useAuth } from "../lib/auth-context"

export function SignIn() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)

    const res = await apiFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    })

    if (res.ok) {
      const user = await res.json()
      setUser(user)
      navigate("/")
    } else {
      const data = await res.json()
      setError(data.error || "Sign in failed")
    }
  }

  return (
    <div className="max-w-md mx-auto py-16 px-6 animate-fade-up">
      <div className="bg-white rounded-2xl shadow-sm border border-sand p-8 md:p-10">
        <h2 className="font-display text-3xl font-bold text-navy mb-2">Welcome back</h2>
        <p className="font-body text-stone mb-8">Sign in to your account</p>

        {error && (
          <div className="mb-6 p-4 bg-terracotta/10 border border-terracotta/20 rounded-lg">
            <p className="font-body text-sm text-terracotta-dark">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" autoFocus autoComplete="email" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" autoComplete="current-password" placeholder="••••••••" />
            </div>
            <div className="pt-2">
              <input type="submit" value="Sign In" />
            </div>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-sand space-y-2 text-center">
          <p><Link to="/sign-up" className="font-body text-sm text-azure hover:text-azure-light transition-colors">Sign up</Link></p>
          <p><Link to="/forgot-password" className="font-body text-sm text-azure hover:text-azure-light transition-colors">Forgot your password?</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
