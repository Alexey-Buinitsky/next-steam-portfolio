export type User = {
  id: number;
  email: string;
  nickname?: string;
}

export async function checkAuth(): Promise<{ user: User | null }> {
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include',
      cache: 'no-store' // FIX: Добавляем чтобы избежать кэширования
    });
    
    if (!response.ok) {
      if (response.status !== 401) {
        console.error('Auth check failed with status:', response.status)
      }
      return { user: null }
    }

    const data = await response.json()
    return { user: data.user }
  } catch (error) {
    console.error('Auth check failed:', error)
    return { user: null }
  }
}

export async function performLogout(): Promise<void> {  
  try {
    await fetch('/api/auth/logout', { method: 'POST' })
  } catch (error) {
    console.error('Logout failed:', error)
  }
}