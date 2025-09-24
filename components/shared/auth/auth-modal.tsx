'use client'
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';
import { Auth, useAuthContext } from '@/components/shared';
import { checkAuth } from '@/services/auth'; 

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const AuthModal: React.FC<Props> = ({ onClose, isOpen, onSuccess }) => {
    const { updateUser } = useAuthContext() 

    const handleSuccess = async () => {
        const { user } = await checkAuth();
        updateUser(user);
        onSuccess?.();
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="sr-only">Add to Portfolio</DialogTitle>
                </DialogHeader>
                <Auth onClose={onClose} onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    )
}