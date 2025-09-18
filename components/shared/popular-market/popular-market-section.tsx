'use client';

import React from 'react';
import { PopularMarketSlider } from './popular-market-slider';
import { useFetchPopularAssets } from '@/hooks';

interface PopularMarketSectionProps {
  category: 'cases' | 'weapons' | 'stickers';
  title: string;
  limit?: number;
}

export const PopularMarketSection: React.FC<PopularMarketSectionProps> = ({ category, title, limit = 20 }) => {
  const { data, isLoading, error } = useFetchPopularAssets(category, limit)

  return (
    <div className="mb-8 2k:mb-11 4k:mb-16 8k:mb-32">
      <h3 className="text-xl 2k:text-2xl 4k:text-3xl 8k:text-6xl font-bold mb-4 2k:mb-5 4k:mb-8 8k:mb-16">{title}</h3>
      <PopularMarketSlider
        items={data || []}
        isLoading={isLoading}
        error={error}
        category={category}
      />
    </div>
  )
}