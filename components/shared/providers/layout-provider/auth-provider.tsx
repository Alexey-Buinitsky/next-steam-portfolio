//app/components/shared/providers/layout-provider/auth-provider.ts
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { checkAuth, type User } from '@/services/api-auth'
import { useQueryClient } from '@tanstack/react-query'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  updateUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const queryClient = useQueryClient() 

  // Загружаем состояние при монтировании
  useEffect(() => {
    checkAuth().then(({ user }) => {
      setUser(user)
      setIsLoading(false)  
    })
  }, [])

  // Очистка кэша при ЛЮБОМ изменении user на null
  useEffect(() => {
    if (!user) {
      // Более агрессивная очистка - удаляем все queries
      // queryClient.removeQueries()

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
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}