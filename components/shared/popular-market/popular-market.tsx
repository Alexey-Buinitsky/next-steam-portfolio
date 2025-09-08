import React from 'react';

import { PopularMarketSection } from './popular-market-section';

export const PopularMarket: React.FC = () => {
  return (
    <div className="rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">Popular Market Items</h2>
      
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