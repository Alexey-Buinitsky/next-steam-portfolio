// app/components/shared/auth/auth-manager.tsx
'use client'

import React from 'react';
import { AuthLoginForm } from './auth-login-form';
import { AuthRegisterForm } from './auth-register-form'
import { AuthForgotPassword } from './auth-forgot-password';
import { AuthResetPassword } from './auth-reset-password';
import { AuthEmailVerification } from './auth-email-verification';
import type { ExtendedAuthMode } from './auth';


interface AuthManagerProps {
    mode: ExtendedAuthMode;
    onModeChange: (mode: ExtendedAuthMode) => void;
    onSuccess: () => void;
    onClose: () => void;
    onVerificationRequired: (email: string, userId: number) => void;
    onForgotPasswordSuccess: (email: string, userId: number) => void;
    verificationEmail?: string;
    verificationUserId?: number | null;
    resetEmail?: string;
    resetUserId?: number | null;
}

export const AuthManager: React.FC<AuthManagerProps> = ({
    mode,
    onModeChange,
    onSuccess,
    onClose,
    onVerificationRequired,
    onForgotPasswordSuccess,
    verificationEmail,
    verificationUserId,
    resetEmail,
    resetUserId
}) => {
    if (mode === 'login') {
        return (
            <AuthLoginForm
                onSwitchToRegister={() => onModeChange('register')}
                onSwitchToForgotPassword={() => onModeChange('forgot-password')}
                onVerificationRequired={onVerificationRequired}
                onSuccess={onSuccess}
                onClose={onClose}
            />
        );
    }

    if (mode === 'register') {
        return (
            <AuthRegisterForm
                onSwitchToLogin={() => onModeChange('login')}
                onVerificationRequired={onVerificationRequired}
                onClose={onClose}
            />
        );
    }

    if (mode === 'forgot-password') {
        return (
            <AuthForgotPassword
                onBackToLogin={() => onModeChange('login')}
                onVerificationRequired={onVerificationRequired}
                onSuccess={onForgotPasswordSuccess}
            />
        );
    }

    if (mode === 'reset-password') {
        return (
            <AuthResetPassword
                onBackToForgot={() => onModeChange('forgot-password')}
                userId={resetUserId ?? 0}
                email={resetEmail}
                onSuccess={onSuccess}
            />
        );
    }


    if (mode === 'email-verification') {
        if (!verificationUserId) {
            return <div>Error: User ID is required for verification</div>;
        }

        
        return (
            <AuthEmailVerification
                email={verificationEmail ?? ''}
                userId={verificationUserId ?? 0}
                onSuccess={onSuccess}
            />
        );
    }

    return null;
};