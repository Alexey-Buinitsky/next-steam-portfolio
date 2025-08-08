'use client'

import { useState } from 'react';
import { useAuthCheck } from './use-auth-check';

export const useAuthAction = <T>() => {
    const { user } = useAuthCheck();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);

    const handleAction = (item: T) => {
        if (!user) {
            setIsAuthModalOpen(true);
            return false;
        }
        setSelectedItem(item);
        return true;
    };

    return {
        isAuthModalOpen,
        setIsAuthModalOpen,
        selectedItem,
        setSelectedItem,
        handleAction,
        user
    };
};