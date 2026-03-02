import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import { apiFetch } from "../lib/api"
import { useAuth } from "../lib/auth-context"

export function SignUp() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [errors, setErrors] = useState<string[]>([])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors([])
    const formData = new FormData(e.currentTarget)

    const res = await apiFetch("/api/registration", {
      method: "POST",
      body: JSON.stringify({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        password: formData.get("password"),
        password_confirmation: formData.get("password_confirmation"),
      }),
    })

    if (res.ok) {
      const user = await res.json()
      setUser(user)
      navigate("/")
    } else {
      const data = await res.json()
      setErrors(data.errors || ["Registration failed"])
    }
  }

  return (
    <div className="max-w-md mx-auto py-16 px-6 animate-fade-up">
      <div className="bg-white rounded-2xl shadow-sm border border-sand p-8 md:p-10">
        <h2 className="font-display text-3xl font-bold text-navy mb-2">Create an account</h2>
        <p className="font-body text-stone mb-8">Get started in seconds</p>

        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-terracotta/10 border border-terracotta/20 rounded-lg">
            {errors.map((err, i) => (
              <p key={i} className="font-body text-sm text-terracotta-dark">{err}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name">First Name</label>
                <input type="text" id="first_name" name="first_name" autoFocus placeholder="First" />
              </div>
              <div>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" id="last_name" name="last_name" placeholder="Last" />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" autoComplete="email" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <span className="text-xs text-stone font-normal normal-case tracking-normal ml-1">(6 characters min)</span>
              <input type="password" id="password" name="password" autoComplete="new-password" placeholder="••••••••" />
            </div>
            <div>
              <label htmlFor="password_confirmation">Password Confirmation</label>
              <input type="password" id="password_confirmation" name="password_confirmation" autoComplete="new-password" placeholder="••••••••" />
            </div>
            <div className="pt-2">
              <input type="submit" value="Create Account" />
            </div>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-sand space-y-2 text-center">
          <p><Link to="/sign-in" className="font-body text-sm text-azure hover:text-azure-light transition-colors">Already have an account? Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
