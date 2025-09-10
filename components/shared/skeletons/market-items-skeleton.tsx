// components/shared/market-items/market-items-skeleton.tsx
'use client'

import React from 'react';
import { Skeleton } from '@/components/ui';

interface Props {
  displayMode: 'grid' | 'list';
}

export const MarketItemsSkeleton: React.FC<Props> = ({ displayMode }) => {
  if (displayMode === 'grid') {
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
  }

  // List mode skeleton
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 justify-between items-center md:items-start mb-4">
        <Skeleton className="h-8 w-48" />
        <div className="flex justify-between md:flex-row gap-4 w-full">
          <Skeleton className="h-10 w-92" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* List Skeleton */}
      <div className="flex flex-col xl:flex-row gap-10">
        <div className="w-full">
          {/* Table header skeleton */}
          <div className="hidden md:grid grid-cols-[64px_1fr_120px_80px] gap-4 mb-4 px-2">
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
          </div>

          {/* List items skeleton */}
          <div className="flex flex-col gap-2 mb-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex items-center w-full border bg-card rounded p-2">
                <Skeleton className="w-16 h-16 mr-4" />
                <div className="flex-grow min-w-0 px-3">
                  <Skeleton className="h-5 w-full mb-1" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side panel skeleton */}
        <div className="xl:w-96">
          <div className="bg-card border rounded-lg p-6">
            <Skeleton className="h-8 w-full mb-4" />
            <Skeleton className="h-24 w-full mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center">
        <Skeleton className="h-9 w-80" />
      </div>
    </div>
  );
};