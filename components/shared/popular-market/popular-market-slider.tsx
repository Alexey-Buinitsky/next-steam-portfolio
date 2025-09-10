// components/shared/popular-market/popular-market-slider.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui';
import { Slider, AddToPortfolioModal } from '@/components/shared';
import { formatPrice, formatVolume } from '@/lib';

import type { Asset } from '@prisma/client';

interface PopularMarketSliderProps {
  items: Asset[];
  isLoading: boolean;
  error: Error | null;
  category: string;
}

export const PopularMarketSlider: React.FC<PopularMarketSliderProps> = ({ items, isLoading, error, category }) => {
  const [selectedItem, setSelectedItem] = React.useState<Asset | null>(null);

  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Failed to load {category}. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex overflow-x-auto pb-4 gap-8 scrollbar-hide">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="min-w-[280px] border rounded-lg p-3 flex-shrink-0">
            <Skeleton className="w-full h-24 mb-3 rounded-lg"/>
            <Skeleton className=" w-full h-4 mb-3 rounded" />
            <div className="flex justify-between">
              <Skeleton className="w-1/3 h-4 rounded" />
              <Skeleton className="w-1/4 h-4 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No {category} available at the moment.
      </div>
    );
  }

  return (
    <>
      <Slider
        autoplayEnabled={false}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          568: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1400: { slidesPerView: 4, spaceBetween: 25 },
          1920: { slidesPerView: 6, spaceBetween: 30 },
          2560: { slidesPerView: 7, spaceBetween: 40 },
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-3 hover:shadow-md transition-shadow dark:hover:shadow-gray-500 cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <Image
              className="mx-auto w-auto h-auto object-contain mb-2"
              src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.imageUrl || ''}`}
              alt={item.name || ''}
              width={104}
              height={104}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <h3 className="font-bold text-sm truncate dark:text-white mb-2">
              {item.name || 'Unknown'}
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-green-600 font-bold dark:text-green-400 text-sm">
                {formatPrice(item.price || undefined) || ''}
              </p>
              <p className="text-xs text-gray-500">
                {formatVolume(item.volume || undefined) || ''}
              </p>
            </div>
          </div>
        ))}
      </Slider>

      {selectedItem && (
        <AddToPortfolioModal
          item={selectedItem}
          open={!!selectedItem}
          onOpenChange={(open) => !open && setSelectedItem(null)}
          disableClose={false}
        />
      )}
    </>
  );
};