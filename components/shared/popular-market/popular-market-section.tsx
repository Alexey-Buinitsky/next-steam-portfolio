// components/shared/popular-market/popular-market-section.tsx
'use client';

import React from 'react';
import { PopularMarketSlider } from './popular-market-slider';
import { usePopularItems } from '@/hooks';

interface PopularMarketSectionProps {
  category: 'cases' | 'weapons' | 'stickers';
  title: string;
  limit?: number;
}

export const PopularMarketSection: React.FC<PopularMarketSectionProps> = ({ category, title, limit = 20 }) => {
  const { data, isLoading, error } = usePopularItems(category, limit);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <PopularMarketSlider
        items={data || []}
        isLoading={isLoading}
        error={error}
        category={category}
      />
    </div>
  );
};