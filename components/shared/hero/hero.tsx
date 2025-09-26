'use client'

import React from 'react';
import { HeroBackground, HeroMain, HeroPortfolioSection } from '@/components/shared';
import { useAuthCheck, usePortfolios } from '@/hooks';


export const Hero: React.FC = () => {
    const { isAuthenticated } = useAuthCheck()
    const { portfolios } = usePortfolios()

    const hasPortfolios = portfolios && portfolios.length > 0

    return (
        <HeroBackground>
            {isAuthenticated && hasPortfolios ? (
                <div className="w-full 2xl:flex items-center gap-20 2k:gap-27 4k:gap-40 8k:gap-80">
                    <HeroMain className="flex items-center justify-center mb-10 2xl:mb-0 2k:mb-0 4k:mb-0 8k:mb-0" />
                    <HeroPortfolioSection className="flex-1 min-w-0 text-center 2xl:text-start"/>
                </div>
            ) : (
                <HeroMain />
            )}
        </HeroBackground>
    )
}