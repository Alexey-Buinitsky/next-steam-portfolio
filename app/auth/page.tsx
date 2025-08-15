'use client'
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthModal } from '@/components/shared';

export default function AuthPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleClose = () => {
        setIsModalOpen(false);
        router.push(redirect);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <AuthModal 
                isOpen={isModalOpen} 
                onClose={handleClose}
                redirectAfterAuth={redirect}
            />
        </div>
    );
}