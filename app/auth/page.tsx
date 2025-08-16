'use client'

import { Auth } from '@/components/shared'
import { useSearchParams } from 'next/navigation'

export default function AuthPage() {
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect') || '/'

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
                <Auth onClose={() => window.location.href = redirect} />
            </div>
        </div>
    )
}