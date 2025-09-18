import React from 'react';
import { Skeleton } from '@/components/ui';

export const PopularMarketSliderSkeleton: React.FC = () => {
  return (
    <div className="flex overflow-x-auto gap-7.5 2k:gap-10.5 4k:gap-15 8k:gap-30 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="min-w-[247px] 2k:min-w-[330px] 4k:min-w-[497px] 8k:min-w-[995px] border rounded-lg p-3 2k:p-4 4k:p-6 8k:p-12 flex-shrink-0">
            <Skeleton className="w-full h-25 2k:h-32 4k:h-48 8k:h-96 mb-3 2k:mb-4.5 4k:mb-7 8k:mb-11 rounded-lg"/>
            <Skeleton className="w-full h-4 2k:h-6 4k:h-8 8k:h-16 mb-3 2k:mb-4.5 4k:mb-7 8k:mb-11 rounded" />
            <div className="flex justify-between">
              <Skeleton className="w-1/3 h-4 2k:h-6 4k:h-8 8k:h-16 rounded" />
              <Skeleton className="w-1/4 h-4 2k:h-6 4k:h-8 8k:h-16 rounded" />
            </div>
          </div>
        ))}
    </div>
  );
};