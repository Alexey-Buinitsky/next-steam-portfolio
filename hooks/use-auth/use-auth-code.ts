'use client'

import React from 'react';

interface AuthCode {
    code: string;
    type: 'verification' | 'password-reset';
    email: string;
    isOpen: boolean;
}

export const useAuthCodes = () => {
    const [currentCode, setCurrentCode] = React.useState<AuthCode | null>(null);

    const showCode = (code: string, type: 'verification' | 'password-reset', email: string) => {
        setCurrentCode({ code, type, email, isOpen: true});
    };

    const hideCode = () => {
        setCurrentCode(null);
    };

    return {currentCode, showCode, hideCode};
};