//app/components/shared/auth/auth.tsx
'use client'

import React, { useState } from 'react';
import { AuthManager } from './auth-manager';
import type { AuthMode } from '@/hooks';

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

export type ExtendedAuthMode = AuthMode | 'forgot-password' | 'reset-password' | 'email-verification';

export const Auth: React.FC<Props> = ({ onClose, onSuccess }) => {
    const [mode, setMode] = useState<ExtendedAuthMode>('login');
    const [verificationEmail, setVerificationEmail] = useState<string>('');
    const [verificationUserId, setVerificationUserId] = useState<number | null>(null);
    const [resetEmail, setResetEmail] = useState<string>('');
    const [resetUserId, setResetUserId] = useState<number | null>(null);

    const handleModeChange = (newMode: ExtendedAuthMode) => {
        setMode(newMode);
    };

    const handleVerificationRequired = (email: string, userId: number) => {
        setVerificationEmail(email);
        setVerificationUserId(userId);
        setMode('email-verification');
    };

    const handleForgotPasswordSuccess = (email: string, userId: number) => {
        setResetEmail(email);
        setResetUserId(userId);
        setMode('reset-password');
    };

    return (
        <AuthManager
            mode={mode}
            onModeChange={handleModeChange}
            onSuccess={onSuccess}
            onClose={onClose}
            onVerificationRequired={handleVerificationRequired}
            onForgotPasswordSuccess={handleForgotPasswordSuccess}
            verificationEmail={verificationEmail}
            verificationUserId={verificationUserId}
            resetEmail={resetEmail}
            resetUserId={resetUserId}
        />
    );
};