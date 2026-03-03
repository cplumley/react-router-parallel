import { useState, type FormEvent } from "react"
import { Link } from "react-router"
import { apiFetch } from "../lib/api"

export function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    await apiFetch("/api/password", {
      method: "POST",
      body: JSON.stringify({ email: formData.get("email") }),
    })

    setSubmitted(true)
  }

  return (
    <div className="max-w-md mx-auto py-16 px-6 animate-fade-up">
      <div className="bg-white rounded-2xl shadow-sm border border-sand p-8 md:p-10">
        <h2 className="font-display text-3xl font-bold text-navy mb-2">Reset password</h2>
        <p className="font-body text-stone mb-8">We'll send you instructions by email</p>

        {submitted ? (
          <div className="p-4 bg-azure/10 border border-azure/20 rounded-lg">
            <p className="font-body text-sm text-navy">If an account exists with that email, you'll receive password reset instructions shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" autoFocus autoComplete="email" placeholder="you@example.com" />
              </div>
              <div className="pt-2">
                <input type="submit" value="Send Reset Instructions" />
              </div>
            </div>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-sand space-y-2 text-center">
          <p><Link to="/sign-in" className="font-body text-sm text-azure hover:text-azure-light transition-colors">Back to sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
