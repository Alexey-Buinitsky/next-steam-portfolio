'use client'

import { useSearchParams } from 'next/navigation'
import { Auth } from '@/components/shared'

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

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
                <Auth onClose={() => window.location.href = redirect} />
            </div>
        </div>
    )
}