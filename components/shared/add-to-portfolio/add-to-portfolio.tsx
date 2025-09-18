import React from 'react';
import { usePortfolios, useAuthCheck } from '@/hooks';
import { CreatePortfolioModal, AuthModal, AddToPortfolioForm, AddToPortfolioFormSkeleton } from '@/components/shared';

import type { Asset } from '@prisma/client';

interface Props {
    item: Asset
    onClose: () => void
    disableClose?: boolean;
}

export const AddToPortfolio: React.FC<Props> = ({ item, onClose, disableClose }) => {

    const { portfolios: portfolioList, createPortfolioAsset, createPortfolio, isLoading } = usePortfolios();

    const { user } = useAuthCheck()
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false)

    const handleCreateClick = () => {
        if (!user) {
            setIsAuthModalOpen(true)
            return
        }
        setIsCreateModalOpen(true)
    }

    if (isLoading) {
        return <AddToPortfolioFormSkeleton />;
    }

    return (
        <div>
            <AddToPortfolioForm 
                item={item} 
                onClose={onClose}
                disableClose={disableClose} 
                createPortfolioAsset={createPortfolioAsset} 
                portfolioList={portfolioList}
                handleCreateClick={handleCreateClick}
            />
            
            <CreatePortfolioModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreatePortfolio={createPortfolio}
            />
            
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </div>
    )
}