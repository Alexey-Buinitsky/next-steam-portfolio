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
        "relative bg-card text-card-foreground rounded-xl p-6 cursor-pointer transition-all duration-300 border-2 hover:shadow-lg",
        isSelected 
          ? "border-green-500 shadow-green-500/20 ring-2 ring-green-500/20" 
          : "border-border hover:border-green-300"
      )}
      onClick={() => onSelect(portfolio)}
    >
      {/* Индикатор выбора */}
      {isSelected && (
        <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
      
      <div className="text-center">
        {/* Иконка портфолио */}
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
          <FileText className="w-8 h-8 text-white" />
        </div>
        
        {/* Название портфолио */}
        <h3 className="font-semibold mb-2 text-lg line-clamp-2">
          {portfolio.name}
        </h3>
        
        {/* Валюта */}
        <p className="text-sm text-muted-foreground mb-3">
          {portfolio.currency}
        </p>
        
        {/* Статус */}
        <div className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
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