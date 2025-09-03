// hooks/use-auth/use-auth-notifications.ts
'use client';

import { useCallback } from 'react';
import { notify, handleApiError, handleApiSuccess, NotificationOptions } from '@/lib';

export const useAuthNotifications = () => {
    const showNotification = useCallback((
        type: 'success' | 'error' | 'warning' | 'info',
        message: string,
        options?: NotificationOptions
    ) => {
        notify[type](message, options);
    }, []);

    const showError = useCallback((error: unknown, fallbackMessage?: string) => {
        handleApiError(error, fallbackMessage);
    }, []);

    const showSuccess = useCallback((message: string) => {
        handleApiSuccess(message);
    }, []);

    return {
        showNotification,
        showError,
        showSuccess,
    };
};