// components/shared/market-items/market-items-skeleton.tsx
'use client'

import React from 'react';
import { Skeleton } from '@/components/ui';

export const MarketItemsSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto p-4 2k:p-5 4k:p-8 8k:p-16 flex flex-col gap-4 2k:gap-5 4k:gap-8 8k:gap-16">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-4 2k:gap-5 4k:gap-8 8k:gap-16 justify-between items-start mb-4 2k:mb-5 4k:mb-8 8k:mb-16">
          <Skeleton className="h-8 2k:h-9 4k:h-12 8k:h-24 w-48 2k:w-64 4k:w-96 8k:w-192" />
          <div className="flex justify-between md:flex-row gap-4 2k:gap-5 4k:gap-8 8k:gap-16 w-full">
            <Skeleton className="h-10 2k:h-13 4k:h-20 8k:h-40 w-full md:w-92 2k:md:w-122 4k:md:w-184 8k:md:w-368" />
            <div className="flex gap-2 2k:gap-3 4k:gap-4 8k:gap-8">
              <Skeleton className="h-9 2k:h-12 4k:h-18 8k:h-36 w-9 2k:w-12 4k:w-18 8k:w-36" />
              <Skeleton className="h-9 2k:h-12 4k:h-18 8k:h-36 w-9 2k:w-12 4k:w-18 8k:w-36" />
            </div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 2k:gap-8 4k:gap-12 8k:gap-24 mb-12 2k:mb-16 4k:mb-24 8k:mb-48">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="h-full bg-card border rounded-lg p-4 2k:p-5 4k:p-8 8k:p-16">
              <Skeleton className="w-full h-32 2k:h-43 4k:h-64 8k:h-128 mb-4 2k:mb-5 4k:mb-8 8k:mb-16" />
              <Skeleton className="h-5 2k:h-6.5 4k:h-9 8k:h-17 w-full mb-3 2k:mb-4 4k:mb-6 8k:mb-12" />
              <div className="flex justify-between">
                <Skeleton className="h-5 2k:h-6.5 4k:h-9 8k:h-17 w-25 2k:w-33 4k:w-50 8k:w-100" />
                <Skeleton className="h-5 2k:h-6.5 4k:h-9 8k:h-17 w-20 2k:w-27 4k:w-40 8k:w-80" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center">
          <Skeleton className="h-10 2k:h-13 4k:h-20 8k:h-40 w-110 2k:w-146 4k:w-220 8k:w-440" />
        </div>
      </div>
  );
};