'use client'

import React from 'react';
import { HeroBackground, HeroMain, HeroPortfolioSection } from '@/components/shared';
import { useAuthCheck, usePortfolios } from '@/hooks';


export const Hero: React.FC = () => {
    const { isAuthenticated } = useAuthCheck();
    const { portfolios } = usePortfolios();

    const hasPortfolios = portfolios && portfolios.length > 0;

    console.log('hero here');

    return (
        <HeroBackground>
            {isAuthenticated && hasPortfolios ? (
                <div className="w-full flex items-center gap-x-20 ">
                    <HeroMain className="flex items-center justify-center" />
                    <HeroPortfolioSection className="flex-1 min-w-0 "/>
                </div>
            ) : (
                <HeroMain />
            )}
        </HeroBackground>
    )
}