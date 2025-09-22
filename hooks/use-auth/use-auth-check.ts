'use client'

import { useAuthContext } from '@/components/shared'
import { performLogout } from '@/services/auth'

export const useAuthCheck = () => {
  const context = useAuthContext()
  
  const logout = async () => {
    await performLogout()
    context.updateUser(null)
  }

  return {
    user: context.user,
    isLoading: context.isLoading,
    logout,
    updateUser: context.updateUser,
    isAuthenticated: !!context.user,
  }
}