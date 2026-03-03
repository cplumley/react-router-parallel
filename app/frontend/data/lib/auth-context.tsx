import { createContext, useContext, useState, type ReactNode } from "react"
import type { ServerUser } from "../routes"

type AuthContextType = {
  user: ServerUser | null
  setUser: (user: ServerUser | null) => void
}

const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => {} })

export function AuthProvider({ initialUser, children }: { initialUser: ServerUser | null; children: ReactNode }) {
  const [user, setUser] = useState<ServerUser | null>(initialUser)
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
