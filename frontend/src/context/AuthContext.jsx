/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Persist login across page refresh using localStorage
    const saved = localStorage.getItem('scamshield_user')
    return saved ? JSON.parse(saved) : null
  })

  const signIn = (email, password) => {
    if (!email || !password) return { error: 'Email and password are required.' }
    if (password.length < 6) return { error: 'Password must be at least 6 characters.' }
    const u = { email, id: Date.now() }
    setUser(u)
    localStorage.setItem('scamshield_user', JSON.stringify(u))
    return { error: null }
  }

  const signUp = (email, password) => {
    // Same as signIn for demo — just logs in
    return signIn(email, password)
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('scamshield_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading: false, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
