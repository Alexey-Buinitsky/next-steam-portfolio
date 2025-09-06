// components/shared/hero/hero-portfolio-section.tsx
'use client'

import React, { useState } from 'react';
import { HeroPortfolioSlide, HeroPortfolioConfirmModal, Slider } from '@/components/shared';
import { usePortfolios } from '@/hooks';
import { FileText } from 'lucide-react';

import type { Portfolio }  from '@prisma/client';

interface Props {
    className?: string;
}

export const HeroPortfolioSection: React.FC<Props> = ({ className }) => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { portfolios, selectedPortfolio: activePortfolio, selectPortfolio, isLoading } = usePortfolios();

  const handlePortfolioSelect = (portfolio: Portfolio) => {
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
      <div className={`bg-muted rounded-xl p-8 text-center ${className}`}>
        <div className="w-16 h-16 mx-auto mb-4 bg-muted-foreground/20 rounded-full flex items-center justify-center">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">
          No portfolios yet
        </h3>
        <p className="text-muted-foreground mb-4">
          Create your first portfolio to start tracking your CS2 investments
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col justify-center ${className}`}>
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Your Portfolios</h2>
            <p className="text-muted-foreground">Select a portfolio to make it active</p>
        </div>

        <div>
          <Slider
              breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 10 },
                  568: { slidesPerView: 2, spaceBetween: 15 },
                  1024: { slidesPerView: 3, spaceBetween: 20 },
                  1400: { slidesPerView: 3, spaceBetween: 25 },
                  1920: { slidesPerView: 3, spaceBetween: 30 },
                  // 2560: { slidesPerView: 5, spaceBetween: 40 }, 
                  // 3100: { slidesPerView: 6, spaceBetween: 50 }, 
                  // 3840: { slidesPerView: 7, spaceBetween: 60 }, 
                  // 7680: { slidesPerView: 8, spaceBetween: 70 }, 
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