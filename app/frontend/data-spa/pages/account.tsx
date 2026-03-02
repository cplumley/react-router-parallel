import { useState, useEffect, type FormEvent } from "react"
import { useNavigate } from "react-router"
import { apiFetch } from "../lib/api"
import { useAuth } from "../lib/auth-context"

export function Account() {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!user) navigate("/sign-in")
  }, [user, navigate])

  if (!user) return null

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors([])
    setSuccess(false)
    const formData = new FormData(e.currentTarget)

    const res = await apiFetch("/api/account", {
      method: "PUT",
      body: JSON.stringify({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        password: formData.get("password"),
        password_confirmation: formData.get("password_confirmation"),
        current_password: formData.get("current_password"),
      }),
    })

    if (res.ok) {
      const updated = await res.json()
      setUser(updated)
      setSuccess(true)
    } else {
      const data = await res.json()
      setErrors(data.errors || ["Update failed"])
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure? This cannot be undone.")) return

    await apiFetch("/api/account", { method: "DELETE" })
    setUser(null)
    navigate("/")
  }

  return (
    <div className="max-w-md mx-auto py-16 px-6 animate-fade-up">
      <div className="bg-white rounded-2xl shadow-sm border border-sand p-8 md:p-10">
        <h2 className="font-display text-3xl font-bold text-navy mb-2">Your profile</h2>
        <p className="font-body text-stone mb-8">Update your account settings</p>

        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-terracotta/10 border border-terracotta/20 rounded-lg">
            {errors.map((err, i) => (
              <p key={i} className="font-body text-sm text-terracotta-dark">{err}</p>
            ))}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-azure/10 border border-azure/20 rounded-lg">
            <p className="font-body text-sm text-navy">Profile updated successfully.</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name">First Name</label>
                <input type="text" id="first_name" name="first_name" defaultValue={user.first_name} />
              </div>
              <div>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" id="last_name" name="last_name" defaultValue={user.last_name} />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" defaultValue={user.email} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <span className="text-xs text-stone font-normal normal-case tracking-normal ml-1">(leave blank to keep current)</span>
              <input type="password" id="password" name="password" autoComplete="new-password" placeholder="••••••••" />
            </div>
            <div>
              <label htmlFor="password_confirmation">Password Confirmation</label>
              <input type="password" id="password_confirmation" name="password_confirmation" autoComplete="new-password" placeholder="••••••••" />
            </div>
            <div className="pt-4 border-t border-sand">
              <label htmlFor="current_password">Current Password</label>
              <span className="text-xs text-stone font-normal normal-case tracking-normal ml-1">(required to confirm changes)</span>
              <input type="password" id="current_password" name="current_password" autoComplete="current-password" />
            </div>
            <div className="pt-2">
              <input type="submit" value="Save Changes" />
            </div>
          </div>
        </form>

        <div className="mt-10 pt-6 border-t border-sand">
          <h3 className="font-display text-lg font-semibold text-terracotta-dark mb-3">Danger zone</h3>
          <p className="font-body text-sm text-stone mb-4">Once you delete your account, there is no going back.</p>
          <button onClick={handleDelete} className="font-body text-sm text-terracotta border border-terracotta px-4 py-2 rounded-lg hover:bg-terracotta hover:text-white transition-colors cursor-pointer">
            Delete my account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Account
