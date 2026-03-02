import { Link } from "react-router"
import { useAuth } from "../lib/auth-context"

export function Home() {
  const { user } = useAuth()

  return (
    <>
      <section className="tile-pattern">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-2xl animate-fade-up">
            <p className="font-body text-terracotta font-semibold text-sm tracking-widest uppercase mb-4">Welcome</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-navy leading-[1.1] mb-6">
              Explore.<br />
              <span className="text-terracotta italic">Build.</span><br />
              Ship.
            </h1>
            <p className="font-body text-stone text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              A starter kit powered by Rails&nbsp;8, Vite, Tailwind&nbsp;CSS, Devise, and React Router. Everything you need to get moving.
            </p>
            <div className="flex flex-wrap gap-4">
              {!user ? (
                <>
                  <Link to="/sign-up" className="inline-flex items-center gap-2 bg-terracotta text-white px-7 py-3.5 rounded-lg font-body font-semibold text-base hover:bg-terracotta-dark transition-all hover:-translate-y-0.5">
                    Get Started
                  </Link>
                  <Link to="/sign-in" className="inline-flex items-center gap-2 border-2 border-navy text-navy px-7 py-3.5 rounded-lg font-body font-semibold text-base hover:bg-navy hover:text-cream transition-all">
                    Sign In
                  </Link>
                </>
              ) : (
                <div className="bg-white/80 backdrop-blur rounded-xl p-8 border border-sand">
                  <p className="font-display text-2xl text-navy mb-2">
                    Welcome back, <span className="text-terracotta">{user.first_name || user.email.split("@")[0]}</span>
                  </p>
                  <p className="font-body text-stone">You're all set. Start building something great.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-sand">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 rounded-lg bg-terracotta/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-terracotta shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-navy mb-2">Vite + HMR</h3>
              <p className="font-body text-stone leading-relaxed">Lightning-fast hot module replacement. Edit your frontend code and see changes instantly.</p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 rounded-lg bg-azure/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-azure shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-navy mb-2">Authentication</h3>
              <p className="font-body text-stone leading-relaxed">Devise handles sign up, sign in, password recovery, and session management out of the box.</p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-12 h-12 rounded-lg bg-terracotta/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-terracotta shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-navy mb-2">Background Jobs</h3>
              <p className="font-body text-stone leading-relaxed">Sidekiq is wired up for async processing. Queue heavy work without blocking your users.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
