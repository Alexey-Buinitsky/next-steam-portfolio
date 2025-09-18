// components/shared/currency/currency-skeleton.tsx
'use client'

import React from 'react';
import { Skeleton } from '@/components/ui';

export const CurrencyConverterSkeleton: React.FC = () => {
  return (
      <div className="w-full max-w-[780px] 2k:max-w-[1038px] 4k:max-w-[1560px] 8k:max-w-[3120px] mx-auto p-6 2k:p-8 4k:p-12 8k:p-24 grid grid-cols-1 lg:grid-cols-[max-content_1fr] items-start justify-center gap-x-6 2k:gap-x-8 4k:gap-x-12 8k:gap-x-24 gap-y-6 2k:gap-y-8 4k:gap-y-12 8k:gap-y-24">
      {/* Кнопка Popular */}
      <Skeleton className="w-28.5 2k:w-33 4k:w-52 8k:w-104 h-13 2k:h-17 4k:h-26 8k:h-52 mt-0 lg:mt-[198px] 2k:mt-[244px] 4k:mt-[344px] 8k:mt-[646px] mb-6 md:mb-0 rounded-md" />
      
      <div className="w-full">
        {/* Заголовок */}
        <Skeleton className="h-10 2k:h-12 4k:h-20 8k:h-32 w-70 2k:w-93 4k:w-140 8k:w-280 mx-auto mb-13 2k:mb-16 4k:mb-20 8k:mb-46" />
        
        {/* Поле Amount */}
        <div className="flex flex-col items-center mb-13 2k:mb-16 4k:mb-20 8k:mb-32">
          <Skeleton className="h-13 2k:h-17 4k:h-26 8k:h-52 w-75 2k:w-94 4k:w-116 8k:w-300 " />
        </div>

        {/* Селекторы валют */}
        <div className="flex items-center gap-x-2 2k:gap-x-3 4k:gap-x-4 8k:gap-x-8 md:gap-x-6 mb-10 2k:mb-13 4k:mb-20 8k:mb-40">
          <div className="flex-1">
            <Skeleton className="h-13 2k:h-17 4k:h-26 8k:h-52 w-full" />
          </div>
          
          <Skeleton className="h-13 2k:h-17 4k:h-26 8k:h-52 w-12 2k:w-16 4k:w-24 8k:w-48 rounded-full" />
          
          <div className="flex-1">
            <Skeleton className="h-13 2k:h-17 4k:h-26 8k:h-52 w-full" />
          </div>
        </div>

        {/* Результат конвертации */}
        <div className="flex justify-between items-start p-4 2k:p-5 4k:p-8 8k:p-16 bg-gray-50 dark:bg-[var(--card)] rounded-md min-h-[100px] 2k:min-h-[133px] 4k:min-h-[200px] 8k:min-h-[400px]">
          <div className="space-y-4 2k:space-y-5 4k:space-y-8 8k:space-y-16">
            <Skeleton className="h-7 2k:h-9 4k:h-14 8k:h-28 w-32 2k:w-43 4k:w-64 8k:w-128" />
            <Skeleton className="h-5 2k:h-7 4k:h-10 8k:h-20 w-32 2k:w-43 4k:w-64 8k:w-128" />
          </div>
          <Skeleton className="h-5 2k:h-7 4k:h-10 8k:h-20 w-36 2k:w-48 4k:w-72 8k:w-144" />
        </div>
      </div>
    </div>
  );
};

export const CurrencyRatesSkeleton: React.FC = () => {
  return (
    <div className="mx-auto bg-gray-50 dark:bg-[var(--card)] rounded-lg p-7.5 2k:p-9 4k:p-15 8k:p-28 mt-10 2k:mt-5 4k:mt-8 8k:mt-16">
      {/* Заголовок */}
      <Skeleton className="h-8 2k:h-11 4k:h-16 8k:h-32 mb-6 2k:mb-8 4k:mb-10 8k:mb-20" />
      
      {/* Список курсов */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-3 gap-x-12 2k:gap-x-16 4k:gap-x-24 8k:gap-x-48 gap-y-3 2k:gap-y-4 4k:gap-y-6 8k:gap-y-11 8k:px-6">
        {Array.from({ length: 39 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2 2k:gap-3 4k:gap-4 8k:gap-8 p-0.33 2k:p-0.44 4k:p-0.66 8k:p-1.32">
            <Skeleton className="h-5 2k:h-7 4k:h-10 8k:h-20 w-10 2k:w-13 4k:w-20 8k:w-40" />
            <Skeleton className="h-5 2k:h-7 4k:h-10 8k:h-20 w-20 2k:w-27 4k:w-40 8k:w-80 ml-auto" />
          </div>
        ))}
      </div>
    </div>
    
  );
};