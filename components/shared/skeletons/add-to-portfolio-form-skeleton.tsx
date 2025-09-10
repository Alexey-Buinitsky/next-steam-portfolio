// components/shared/skeletons/add-to-portfolio-form-skeleton.tsx
'use client'

import React from 'react';
import { Skeleton } from '@/components/ui';

export const AddToPortfolioFormSkeleton: React.FC = () => {
    return (
        <div className="w-full">
            {/* Скелетон изображения */}
            <Skeleton className="w-3/4 mx-auto h-32 mb-4" />
            
            {/* Скелетон заголовка */}
            <div className="text-center mb-4">
                <Skeleton className="h-8 w-3/4 mx-auto mb-6" />
            </div>

            {/* Скелетон выбора портфолио */}
            <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>

            {/* Скелетон полей ввода */}
            <div className="flex items-start gap-4 mb-4">
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>

            {/* Скелетон кнопок */}
            <div className="flex justify-end gap-2 pt-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
    );
};
