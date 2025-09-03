//app/components/shared/auth/auth-modal.tsx
'use client'
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';
import { Auth } from '@/components/shared';
import { useAuthContext } from '../providers/layout-provider/auth-provider'; 
import { checkAuth } from '@/services/api-auth'; 

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void; // Добавляем опциональный колбэк
}

export const AuthModal: React.FC<Props> = ({ onClose, isOpen, onSuccess }) => {
    const { updateUser } = useAuthContext() // Получаем функцию обновления

    const handleSuccess = async () => {
        const { user } = await checkAuth();
        updateUser(user);

        onSuccess?.(); // Вызываем переданный колбэк
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