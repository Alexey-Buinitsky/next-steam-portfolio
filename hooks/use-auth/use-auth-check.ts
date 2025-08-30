'use client'

import { useAuthContext } from '@/components/shared/providers/layout-provider/auth-provider'
import { performLogout } from '@/services/api-auth'

export const useAuthCheck = () => {
  const context = useAuthContext() // Из контекста
  
  const logout = async () => {
    await performLogout();
    context.updateUser(null);
  };

  return {
    user: context.user,
    isLoading: context.isLoading,
    logout,
    updateUser: context.updateUser,
    isAuthenticated: !!context.user,
  };
};