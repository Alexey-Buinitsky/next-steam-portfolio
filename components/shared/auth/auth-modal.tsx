'use client'
import React, { useRef } from 'react';
import { useKey, useClickAway } from 'react-use'
import { AuthForm } from './auth-form';

interface Props {
    onClose: () => void;
    isOpen: boolean;
}

export const AuthModal: React.FC<Props> = ({ onClose, isOpen }) => {
    const modalRef = useRef<HTMLDivElement>(null)

    useKey('Escape', onClose);
    useClickAway(modalRef, onClose);
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div ref={modalRef} className="w-full max-w-md mx-4">
                <AuthForm onClose={onClose}/>
            </div>
        </div>
    );
};