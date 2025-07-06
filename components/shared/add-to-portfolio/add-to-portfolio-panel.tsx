import React from 'react';
import { AddToPortfolioForm } from './index';
import { Asset } from '@prisma/client';

interface Props {
    item: Asset
    className?: string;
}

export const AddToPortfolioPanel: React.FC<Props> = ({ className, item}) => {
    return (
        <div className={className}>
            <AddToPortfolioForm 
                item={ item }
                onClose={() => {}} // Пустая функция, окно не будет закрываться
                disableClose // Добавим этот пропс в AddToPortfolio
            />
        </div>
    );
};