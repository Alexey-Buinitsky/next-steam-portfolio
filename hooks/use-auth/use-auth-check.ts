'use client'

import { useState, useEffect } from 'react'
import { checkAuth, performLogout, User } from '@/services/auth'

//Проверка в useAuth (клиент) - cразу скрывает UI для неавторизованных
export function useAuthCheck() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyAuth = async () => {
            const { user } = await checkAuth();
            setUser(user);
            setLoading(false);
        };

        verifyAuth();
    }, [])

    const logout = async () => {
        await performLogout();
        setUser(null);
        window.location.reload();
    };

    return { user, loading, logout }
}

