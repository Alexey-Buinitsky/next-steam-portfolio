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
                <div className="w-full 2xl:flex items-center gap-20 ">
                    <HeroMain className="flex items-center justify-center mb-10 2xl:mb-0" />
                    <HeroPortfolioSection className="flex-1 min-w-0 text-center 2xl:text-start"/>
                </div>
            ) : (
                <HeroMain />
            )}
        </HeroBackground>
    )
}