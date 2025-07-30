'use client'

import { useState, useEffect } from 'react'

interface User {
    id: number
    login: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/me')
            
            if (response.ok) {
                const data = await response.json()
                setUser(data.user)
            }
        } catch (error) {
            console.error('Auth check failed:', error)
        } finally {
            setLoading(false)
        }
    }

    checkAuth()
  }, [])

  const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            setUser(null)
            window.location.reload() // Простое решение для обновления состояния
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

  return { user, loading, logout }
}