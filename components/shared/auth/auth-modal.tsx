'use client'
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';
import { Auth } from '@/components/shared';
import { useSearchParams } from 'next/navigation'

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ onClose, isOpen }) => {
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect') || '/'

    const handleClose = () => {
        onClose()
        window.location.href = redirect
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="sr-only">Add to Portfolio</DialogTitle>
                </DialogHeader>
                <Auth onClose={handleClose} />
            </DialogContent>
        </Dialog>
    )
}