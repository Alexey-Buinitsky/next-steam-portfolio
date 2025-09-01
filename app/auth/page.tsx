'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Auth } from '@/components/shared'
import { useAuthContext } from '@/components/shared/providers/layout-provider/auth-provider'
import { checkAuth } from '@/services/api-auth'

// import { Metadata } from 'next'

// export const metadata: Metadata = {
// 	title: "Auth",
// 	openGraph: {
// 		title: "Auth",
// 	},
// 	robots: {
// 		index: false,
// 		follow: true,
// 	}
// }

export default function AuthPage() {
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect') || '/'
    const router = useRouter()
    const { updateUser } = useAuthContext()

    const handleClose = () => {
        router.push(redirect) 
    }

    const handleSuccess = async () => {
        const { user } = await checkAuth()
        updateUser(user)
        router.push(redirect)
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
                <Auth onClose={handleClose} onSuccess={handleSuccess}/>
            </div>
        </div>
    )
}