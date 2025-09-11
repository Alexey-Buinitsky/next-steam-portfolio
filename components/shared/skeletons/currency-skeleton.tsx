// components/shared/currency/currency-skeleton.tsx
'use client'

import React from 'react';
import { Skeleton } from '@/components/ui';

export const CurrencyConverterSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-[780px] mx-auto lg:p-6 lg:grid grid-cols-1 lg:grid-cols-[max-content_1fr] items-start justify-center gap-x-6 gap-y-6">
      {/* Кнопка Popular */}
      <Skeleton className="h-9 w-24 lg:h-13 lg:w-28 lg:mt-[196px] mb-6 md:mb-0 rounded-md" />
      
      <div className="w-full">
        {/* Заголовок */}
        <Skeleton className="h-10 w-70 mx-auto mb-13" />
        
        {/* Поле Amount */}
        <div className="flex flex-col items-center mb-13">
          <Skeleton className="h-13 w-74 max-w-xs py-6" />
        </div>

        {/* Селекторы валют */}
        <div className="flex items-center gap-x-2 md:gap-x-6 mb-10">
          <div className="flex-1">
            <Skeleton className="h-13 w-full" />
          </div>
          
          <Skeleton className="h-13 w-12 rounded-full" />
          
          <div className="flex-1">
            <Skeleton className="h-12 w-full" />
          </div>
        </div>

        {/* Результат конвертации */}
        <div className="flex justify-between items-start p-3.5 lg:p-4 bg-gray-50 dark:bg-[var(--card)] rounded-md min-h-auto lg:min-h-[100px]">
          <div className="space-y-4">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-5 w-36" />
        </div>
      </div>
    </div>
  );
};

export const CurrencyRatesSkeleton: React.FC = () => {
  return (
    <div className="mx-auto bg-gray-50 dark:bg-[var(--card)] rounded-lg p-7 mt-4 md:mt-10">
      {/* Заголовок */}
      <Skeleton className="h-8 md:w-90 mb-7" />
      
      {/* Список курсов */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-3 gap-x-12 gap-y-3">
        {Array.from({ length: 39 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2 p-0.33">
            <Skeleton className="h-5 w-10 " />
            <Skeleton className="h-5 w-20 ml-auto " />
          </div>
        ))}
      </div>
    </div>
  );
};