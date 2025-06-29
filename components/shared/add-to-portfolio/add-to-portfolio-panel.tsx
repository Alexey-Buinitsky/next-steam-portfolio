import React from 'react';
import { AddToPortfolioForm } from './index';

interface Props {
    itemId: number
    itemName: string
    itemPrice: number
    itemImageUrl: string
    className?: string;
}

export const AddToPortfolioPanel: React.FC<Props> = ({ className, ...props }) => {
    return (
        <div className={className}>
            <AddToPortfolioForm 
                {...props}
                onClose={() => {}} // Пустая функция, окно не будет закрываться
                disableClose // Добавим этот пропс в AddToPortfolio
            />
        </div>
    );
};