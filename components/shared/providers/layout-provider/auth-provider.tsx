'use client'

import React, { createContext } from 'react'
import { checkAuth, type User } from '@/services/auth'
import { useQueryClient } from '@tanstack/react-query'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  updateUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const queryClient = useQueryClient()

  React.useEffect(() => {
    checkAuth().then(({ user }) => {
      setUser(user)
      setIsLoading(false)  
    })
  }, [])

  React.useEffect(() => {
    if (!user) {
      queryClient.removeQueries({ queryKey: ['portfolios'] })
      queryClient.removeQueries({ queryKey: ['portfolioAssets'] })
    }
  }, [user, queryClient])

  const updateUser = (newUser: User | null) => {
    setUser(newUser)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}