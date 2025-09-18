// components/shared/hero/hero-portfolio-slide.tsx
'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { Portfolio } from '@prisma/client';
import { Check, FileText } from 'lucide-react';

interface PortfolioSlideProps {
  portfolio: Portfolio;
  isSelected: boolean;
  onSelect: (portfolio: Portfolio) => void;
}

export const HeroPortfolioSlide: React.FC<PortfolioSlideProps> = ({ portfolio, isSelected, onSelect }) => {
  return (
    <div
      className={cn(
        "relative bg-card text-card-foreground rounded-xl p-6 2k:p-8 4k:p-12 8k:p-24 cursor-pointer transition-all duration-300 border-2 hover:shadow-lg",
        isSelected 
          ? "border-green-500 shadow-green-500/20 ring-2 ring-green-500/20 cursor-default" 
          : "border-border hover:border-green-300"
      )}
      onClick={() => onSelect(portfolio)}
    >
      {/* Индикатор выбора */}
      {isSelected && (
        <div className="absolute top-2 2k:top-3 4k:top-4 8k:top-8 left-2 2k:left-3 4k:left-4 8k:left-8 w-6 2k:w-8 4k:w-12 8k:w-24 h-6 2k:h-8 4k:h-12 8k:h-24 bg-green-500 rounded-full flex items-center justify-center z-10">
          <Check className="w-3 2k:w-4 4k:w-6 8k:w-12 h-3 2k:h-4 4k:h-6 8k:h-12 text-white" />
        </div>
      )}
      
      <div className="text-center">
        {/* Иконка портфолио */}
        <div className="w-16 2k:w-21 4k:w-32 8k:w-64 h-16 2k:h-21 4k:h-32 8k:h-64 mx-auto mb-4 2k:mb-5 4k:mb-8 8k:mb-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
          <FileText className="w-8 2k:w-10 4k:w-16 8k:w-32 h-8 2k:h-10 4k:h-16 8k:h-32 text-white" />
        </div>
        
        {/* Название портфолио */}
        <h3 className="font-semibold mb-2 2k:mb-3 4k:mb-4 8k:mb-8 text-lg 2k:text-xl 4k:text-[30px] 8k:text-[60px] line-clamp-1">
          {portfolio.name}
        </h3>
        
        {/* Валюта */}
        <p className="text-sm 2k:text-base 4k:text-[24px] 8k:text-[48px] text-muted-foreground mb-3 2k:mb-4 4k:mb-6 8k:mb-12">
          {portfolio.currency}
        </p>
        
        {/* Статус */}
        <div className={cn(
          "inline-flex items-center px-3 2k:px-4 4k:px-6 8k:px-12 py-1 2k:py-2 4k:py-3 8k:py-6 rounded-full text-xs 2k:text-sm 4k:text-[16px] 8k:text-[32px] font-medium",
          portfolio.isActive 
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
            : "bg-muted text-muted-foreground"
        )}>
          {portfolio.isActive ? 'Active' : 'Inactive'}
        </div>
      </div>
    </div>
  );
};