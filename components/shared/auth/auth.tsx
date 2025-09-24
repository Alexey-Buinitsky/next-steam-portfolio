//app/components/shared/auth/auth.tsx
'use client'

import React from 'react';
import { AuthManager, AuthCodeDisplayModal} from './';
import  { useAuthCodes, type AuthMode } from '@/hooks';

interface Props {
    onClose: () => void;
    onSuccess: () => void;
    initialMode?: AuthMode;
}

export type ExtendedAuthMode = AuthMode | 'forgot-password' | 'reset-password' | 'email-verification';

export const Auth: React.FC<Props> = ({ onClose, onSuccess, initialMode = 'login'}) => {
    const [mode, setMode] = React.useState<ExtendedAuthMode>(initialMode);
    const [verificationEmail, setVerificationEmail] = React.useState<string>('');
    const [verificationUserId, setVerificationUserId] = React.useState<number | null>(null);
    const [resetEmail, setResetEmail] = React.useState<string>('');
    const [resetUserId, setResetUserId] = React.useState<number | null>(null);

    const { currentCode, showCode, hideCode } = useAuthCodes();

    const handleShowVerificationCode = (code: string, email: string) => {
        showCode(code, 'verification', email);
    };

    const handleShowPasswordResetCode = (code: string, email: string) => {
        showCode(code, 'password-reset', email);
    };

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
        <>
            <AuthManager
                mode={mode}
                onModeChange={handleModeChange}
                onSuccess={onSuccess}
                onClose={onClose}
                onVerificationRequired={handleVerificationRequired}
                onForgotPasswordSuccess={handleForgotPasswordSuccess}
                onShowVerificationCode={handleShowVerificationCode}
                onShowPasswordResetCode={handleShowPasswordResetCode}
                verificationEmail={verificationEmail}
                verificationUserId={verificationUserId}
                resetEmail={resetEmail}
                resetUserId={resetUserId}
            />

            {/* Модальное окно для отображения кодов */}
            {currentCode && (
                <AuthCodeDisplayModal
                    isOpen={currentCode.isOpen}
                    onClose={hideCode}
                    code={currentCode.code}
                    type={currentCode.type}
                    email={currentCode.email}
                />
            )}
        </>
    );
};
