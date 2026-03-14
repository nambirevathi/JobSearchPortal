import React, { createContext, useState, useCallback, useEffect, useRef } from 'react'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // In-memory user store (reset on page refresh)
  const usersRef = useRef([
    { email: 'rahul', password: 'rahul@2021' }
  ])

  // Check if user is already logged in on mount
  useEffect(() => {
    const email = Cookies.get('authEmail')
    if (email) {
      setUser({ email })
    }
  }, [])

  const signup = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)

    // Simulate async work
    await new Promise((resolve) => setTimeout(resolve, 200))

    const exists = usersRef.current.some((u) => u.email === email)
    if (exists) {
      setError('Email is already registered')
      setLoading(false)
      return false
    }

    usersRef.current.push({ email, password })
    Cookies.set('authEmail', email, { expires: 7 })
    setUser({ email })
    setLoading(false)
    return true
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)

    // Simulate async work
    await new Promise((resolve) => setTimeout(resolve, 200))

    const match = usersRef.current.find((u) => u.email === email && u.password === password)

    if (match) {
      Cookies.set('authEmail', email, { expires: 7 })
      setUser({ email })
      setLoading(false)
      return true
    }

    setError('Invalid email or password')
    setLoading(false)
    return false
  }, [])

  const logout = useCallback(() => {
    Cookies.remove('authEmail')
    setUser(null)
    setError(null)
  }, [])

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    signup,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
