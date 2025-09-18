import { Metadata } from 'next'
import { AuthClient } from '@/components/shared'

export const metadata: Metadata = {
	title: "Auth",
	openGraph: {
		title: "Auth",
	},
	robots: {
		index: false,
		follow: true,
	}
}

export default function AuthPage() {
    return <AuthClient />
}