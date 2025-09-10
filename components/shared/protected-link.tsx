'use client'

import React from 'react'
import Link from 'next/link'
import { AuthModal } from '@/components/shared'
import { useAuthCheck } from '@/hooks/use-auth/use-auth-check'

interface ProtectedLinkProps {
	href: string
	children: React.ReactNode
	className?: string
	onClick?: () => void
}

export const ProtectedLink: React.FC<ProtectedLinkProps> = ({ href, children, className, onClick }) => {
	const { user } = useAuthCheck()
	const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false)

	const handleClick = (e: React.MouseEvent) => {
		if (!user && href === '/portfolio') {
			e.preventDefault()
			setIsAuthModalOpen(true)
		}

		onClick?.()
	}

	return (
		<>
			<Link href={href} className={className} onClick={handleClick}>
				{children}
			</Link>

			<AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
		</>
	)
}