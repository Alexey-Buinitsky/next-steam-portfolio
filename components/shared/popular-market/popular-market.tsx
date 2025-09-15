import React from 'react';

import { PopularMarketSection } from './popular-market-section';

export const PopularMarket: React.FC = () => {
  return (
    <div className="rounded-lg mt-8 2k:mt-10 4k:mt-16 8k:mt-32">
      <h2 className="text-2xl 2k:text-3xl 4k:text-4xl 8k:text-8xl font-bold mb-6 2k:mb-8 4k:mb-12 8k:mb-24">Popular Market Items</h2>
      
      <PopularMarketSection
        category="cases"
        title="Top Cases"
        limit={15}
      />
      
      <PopularMarketSection
        category="weapons"
        title="Popular Weapons"
        limit={15}
      />
      
      <PopularMarketSection
        category="stickers"
        title="Trending Stickers"
        limit={15}
      />
    </div>
  );
};