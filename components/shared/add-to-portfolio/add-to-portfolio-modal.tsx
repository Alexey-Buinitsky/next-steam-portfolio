'use client'

import React, { useRef } from 'react';
import { useClickAway, useKey } from 'react-use'
import 'react-toastify/dist/ReactToastify.css';
import { AddToPortfolioForm } from './index';
import type { Asset } from '@prisma/client';

interface Props {
    item: Asset
    onClose: () => void
    className?: string;
    disableClose?: boolean;
}

export const AddToPortfolioModal: React.FC<Props> = ({ item, onClose, className }) => {

    const modalRef = useRef<HTMLDivElement>(null)

    useClickAway(modalRef, (event) => {
        const isSelectContent = (event.target as Element)?.closest('.select-content');
        if (!isSelectContent) {
            onClose();
        }
    });
    useKey('Escape', onClose);

    return (
        <div className={ `${className} fixed inset-0 bg-gray-900/50 dark:bg-[var(--background)]/50 flex items-center justify-center z-50` }>
            <div ref={modalRef} >
                <AddToPortfolioForm item={item} onClose={onClose}/>
            </div>
        </div>
    );
};