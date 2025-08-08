'use client'

import Link from 'next/link'
import { useAuthCheck } from '@/hooks/use-auth/use-auth-check'
import { useState } from 'react'
import { AuthModal } from '@/components/shared'

interface ProtectedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const ProtectedLink = ({ href, children, className, onClick }: ProtectedLinkProps) => {
    const { user } = useAuthCheck()
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

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