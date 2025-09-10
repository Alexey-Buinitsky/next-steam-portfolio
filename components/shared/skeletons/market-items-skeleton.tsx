// components/shared/market-items/market-items-skeleton.tsx
'use client'

import React from 'react';
import { Skeleton } from '@/components/ui';

export const MarketItemsSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-4 justify-between items-start mb-4">
          <Skeleton className="h-8 w-48" />
          <div className="flex justify-between md:flex-row gap-4 w-full">
            <Skeleton className="h-9 w-full md:w-92" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-12">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="h-full bg-card border rounded-lg p-4">
              <Skeleton className="w-full h-32 mb-4" />
              <Skeleton className="h-6 w-full mb-3" />
              <div className="flex justify-between">
                <Skeleton className="h-6 w-25" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center">
          <Skeleton className="h-10 w-110" />
        </div>
      </div>
  );
};