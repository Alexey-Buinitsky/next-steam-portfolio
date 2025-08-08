'use client'
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';
import { Auth } from '@/components/shared';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ onClose, isOpen }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="sr-only">Add to Portfolio</DialogTitle>
                </DialogHeader>
                <Auth onClose={onClose} />
            </DialogContent>
        </Dialog>
    );
};