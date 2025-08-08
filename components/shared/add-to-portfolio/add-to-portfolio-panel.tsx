import React from 'react';
import { AddToPortfolio} from '@/components/shared';
import { Asset } from '@prisma/client';

interface Props {
    item: Asset
    className?: string;
}

export const AddToPortfolioPanel: React.FC<Props> = ({ className, item}) => {
    return (
        <div className={className}>
            <AddToPortfolio
                item={ item }
                onClose={() => {}} // Пустая функция, окно не будет закрываться
                disableClose // Добавим этот пропс в AddToPortfolio
            />
        </div>
    );
};