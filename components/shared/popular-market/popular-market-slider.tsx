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
      <div className="text-center py-8 2k:py-10 4k:py-16 8k:py-32 text-muted-foreground text-base 2k:text-xl 4k:text-3xl 8k:text-7xl">
        Failed to load {category}. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex overflow-x-auto pb-4 2k:pb-5 4k:pb-8 8k:pb-16 gap-8 2k:gap-10 4k:gap-16 8k:gap-32 scrollbar-hide">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="min-w-[280px] 2k:min-w-[372px] 4k:min-w-[560px] 8k:min-w-[1120px] border rounded-lg p-3 2k:p-4 4k:p-6 8k:p-12 flex-shrink-0">
            <Skeleton className="w-full h-24 2k:h-32 4k:h-48 8k:h-96 mb-3 2k:mb-4 4k:mb-6 8k:mb-12 rounded-lg"/>
            <Skeleton className="w-full h-4 2k:h-5 4k:h-8 8k:h-16 mb-3 2k:mb-4 4k:mb-6 8k:mb-12 rounded" />
            <div className="flex justify-between">
              <Skeleton className="w-1/3 h-4 2k:h-5 4k:h-8 8k:h-16 rounded" />
              <Skeleton className="w-1/4 h-4 2k:h-5 4k:h-8 8k:h-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 2k:py-10 4k:py-16 8k:py-32 text-muted-foreground text-base 2k:text-xl 4k:text-3xl 8k:text-7xl">
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
          2560: { slidesPerView: 6, spaceBetween: 40 },
          3840: { slidesPerView: 6, spaceBetween: 60 },
          7680: { slidesPerView: 6, spaceBetween: 120 },
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-3 2k:p-4 4k:p-6 8k:p-12 hover:shadow-md transition-shadow dark:hover:shadow-gray-500 cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <Image
              className="mx-auto w-auto h-auto object-contain mb-2 2k:mb-3 4k:mb-4 8k:mb-8 2k:size-33.5 4k:size-52 8k:size-104"
              src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.imageUrl || ''}`}
              alt={item.name || ''}
              width={104}
              height={104}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <h3 className="font-bold text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl truncate dark:text-white mb-2 2k:mb-3 4k:mb-4 8k:mb-8">
              {item.name || 'Unknown'}
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-green-600 font-bold dark:text-green-400 text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl">
                {formatPrice(item.price || undefined) || ''}
              </p>
              <p className="text-xs 2k:text-sm 4k:text-xl 8k:text-5xl text-gray-500">
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