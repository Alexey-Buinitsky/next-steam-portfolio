// components/shared/skeletons/add-to-portfolio-form-skeleton.tsx
'use client'

import React from 'react';
import { Skeleton } from '@/components/ui';

export const AddToPortfolioFormSkeleton: React.FC = () => {
    return (
         <div className="w-full">
            {/* Скелетон изображения */}
            <Skeleton className="w-3/4 mx-auto h-32 2k:h-43 4k:h-64 8k:h-128 mb-4 2k:mb-5 4k:mb-8 8k:mb-16" />
            
            {/* Скелетон заголовка */}
            <div className="text-center mb-4 2k:mb-5 4k:mb-8 8k:mb-16">
                <Skeleton className="h-8 2k:h-11 4k:h-16 8k:h-32 w-3/4 mx-auto mb-6 2k:mb-8 4k:mb-12 8k:mb-24" />
            </div>

            {/* Скелетон выбора портфолио */}
            <div className="space-y-2 2k:space-y-3 4k:space-y-4 8k:space-y-8 mb-4 2k:mb-5 4k:mb-8 8k:mb-16">
                <Skeleton className="h-4 2k:h-5 4k:h-8 8k:h-16 w-20 2k:w-27 4k:w-40 8k:w-80" />
                <Skeleton className="h-10 2k:h-13 4k:h-20 8k:h-40 w-full" />
            </div>

            {/* Скелетон полей ввода */}
            <div className="flex items-start gap-4 2k:gap-5 4k:gap-8 8k:gap-16 mb-4 2k:mb-5 4k:mb-8 8k:mb-16">
                <div className="flex-1 space-y-2 2k:space-y-3 4k:space-y-4 8k:space-y-8">
                    <Skeleton className="h-4 2k:h-5 4k:h-8 8k:h-16 w-20 2k:w-27 4k:w-40 8k:w-80" />
                    <Skeleton className="h-10 2k:h-13 4k:h-20 8k:h-40 w-full" />
                </div>
                <div className="flex-1 space-y-2 2k:space-y-3 4k:space-y-4 8k:space-y-8">
                    <Skeleton className="h-4 2k:h-5 4k:h-8 8k:h-16 w-20 2k:w-27 4k:w-40 8k:w-80" />
                    <Skeleton className="h-10 2k:h-13 4k:h-20 8k:h-40 w-full" />
                </div>
            </div>

            {/* Скелетон кнопок */}
            <div className="flex justify-end gap-2 2k:gap-3 4k:gap-4 8k:gap-8 pt-2 2k:pt-3 4k:pt-4 8k:pt-8">
                <Skeleton className="h-10 2k:h-13 4k:h-20 8k:h-40 w-20 2k:w-27 4k:w-40 8k:w-80" />
                <Skeleton className="h-10 2k:h-13 4k:h-20 8k:h-40 w-32 2k:w-43 4k:w-64 8k:w-128" />
            </div>
        </div>
        // <div className="w-full">
        //     {/* Скелетон изображения */}
        //     <Skeleton className="w-3/4 mx-auto h-32 mb-4" />
            
        //     {/* Скелетон заголовка */}
        //     <div className="text-center mb-4">
        //         <Skeleton className="h-8 w-3/4 mx-auto mb-6" />
        //     </div>

        //     {/* Скелетон выбора портфолио */}
        //     <div className="space-y-2 mb-4">
        //         <Skeleton className="h-4 w-20" />
        //         <Skeleton className="h-10 w-full" />
        //     </div>

        //     {/* Скелетон полей ввода */}
        //     <div className="flex items-start gap-4 mb-4">
        //         <div className="flex-1 space-y-2">
        //             <Skeleton className="h-4 w-20" />
        //             <Skeleton className="h-10 w-full" />
        //         </div>
        //         <div className="flex-1 space-y-2">
        //             <Skeleton className="h-4 w-20" />
        //             <Skeleton className="h-10 w-full" />
        //         </div>
        //     </div>

        //     {/* Скелетон кнопок */}
        //     <div className="flex justify-end gap-2 pt-2">
        //         <Skeleton className="h-10 w-20" />
        //         <Skeleton className="h-10 w-32" />
        //     </div>
        // </div>
    );
};
