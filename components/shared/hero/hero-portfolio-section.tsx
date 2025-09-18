// components/shared/hero/hero-portfolio-section.tsx
'use client'

import React from 'react';
import { HeroPortfolioSlide, HeroPortfolioConfirmModal, Slider } from '@/components/shared';
import { usePortfolios } from '@/hooks';
import { FileText } from 'lucide-react';

import type { Portfolio }  from '@prisma/client';

interface Props {
    className?: string;
}

export const HeroPortfolioSection: React.FC<Props> = ({ className }) => {
  const [selectedPortfolio, setSelectedPortfolio] = React.useState<Portfolio | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);

  const { portfolios, selectedPortfolio: activePortfolio, selectPortfolio, isLoading } = usePortfolios();

  const handlePortfolioSelect = (portfolio: Portfolio) => {
    if (portfolio.id === activePortfolio?.id) return
    
    setSelectedPortfolio(portfolio);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSelection = () => {
    if (!selectedPortfolio) return;
    
    selectPortfolio(selectedPortfolio);
    setIsConfirmModalOpen(false);
    setSelectedPortfolio(null);
  };

    if (!portfolios || portfolios.length === 0) {
    return (
      <div className={`bg-muted rounded-xl p-8 2k:p-10 4k:p-16 8k:p-32 text-center ${className}`}>
        <div className="w-16 2k:w-21 4k:w-32 8k:w-64 h-16 2k:h-21 4k:h-32 8k:h-64 mx-auto mb-4 2k:mb-5 4k:mb-8 8k:mb-16 bg-muted-foreground/20 rounded-full flex items-center justify-center">
          <FileText className="w-8 2k:w-10 4k:w-16 8k:w-32 h-8 2k:h-10 4k:h-16 8k:h-32 text-muted-foreground" />
        </div>
        <h3 className="text-lg 2k:text-xl 4k:text-[30px] 8k:text-[60px] font-medium mb-2 2k:mb-3 4k:mb-4 8k:mb-8">
          No portfolios yet
        </h3>
        <p className="text-muted-foreground mb-4 2k:mb-5 4k:mb-8 8k:mb-16 text-base 2k:text-lg 4k:text-[24px] 8k:text-[48px]">
          Create your first portfolio to start tracking your CS2 investments
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col justify-center ${className}`}>
        <div className="mb-6 2k:mb-8 4k:mb-12 8k:mb-24">
            <h2 className="text-2xl 2k:text-3xl 4k:text-[40px] 8k:text-[80px] font-bold mb-2 2k:mb-3 4k:mb-4 8k:mb-8">Your Portfolios</h2>
            <p className="text-muted-foreground text-base 2k:text-lg 4k:text-[24px] 8k:text-[48px]">Select a portfolio to make it active</p>
        </div>

        <div>
          <Slider
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              568: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1536: { slidesPerView: 2, spaceBetween: 30 },
              1745: { slidesPerView: 3, spaceBetween: 30 },
              2560: { slidesPerView: 3, spaceBetween: 40 }, 
              3840: { slidesPerView: 3, spaceBetween: 60 }, 
              7680: { slidesPerView: 3, spaceBetween: 120 }, 
            }}
            autoplayEnabled={false}
          >
              {portfolios.map((portfolio) => (
                  <HeroPortfolioSlide
                      key={portfolio.id}
                      portfolio={portfolio}
                      isSelected={portfolio.id === activePortfolio?.id}
                      onSelect={handlePortfolioSelect}
                  />
              ))}
          </Slider>
        </div>

        <HeroPortfolioConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={() => {
                setIsConfirmModalOpen(false);
                setSelectedPortfolio(null);
            }}
            onConfirm={handleConfirmSelection}
            portfolio={selectedPortfolio}
            isLoading={isLoading}
        />
    </div>
  );
};