import React, { createContext, useEffect, useState } from "react"

import { User } from "@/types/user"
import myApi from "@/lib/api-handler"

type WrapperProps = {
  children: React.ReactNode
}

interface IAuthContext {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  handleLogout: () => void
  authenticateUser: () => void
}

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  authenticateUser: () => {},
} as IAuthContext)

const AuthContextWrapper = ({ children }: WrapperProps) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  async function authenticateUser() {
    const token = localStorage.getItem("token")
    try {
      if (token) {
        const response = await myApi.get("/api/auth/verify")
        setUser(response.data)
        setIsLoggedIn(true)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setIsLoggedIn(false)
        setUser(null)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, authenticateUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }

export default AuthContextWrapper
