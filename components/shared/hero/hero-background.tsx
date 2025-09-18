// components/shared/hero/hero-background.tsx
'use client'

import React from 'react';
import { useAuthCheck } from '@/hooks';

interface HeroBackgroundProps {
  children: React.ReactNode;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ children }) => {
  const { user } = useAuthCheck();

  return (
    <div className="relative min-h-[600px] 2k:min-h-[800px] 4k:min-h-[1200px] 8k:min-h-[2400px] overflow-hidden">
      {/* Мигающие элементы */}
        <div className="absolute top-30 2k:top-40 4k:top-60 8k:top-120 left-60 2k:left-80 4k:left-120 8k:left-240 w-34 2k:w-45 4k:w-68 8k:w-136 h-34 2k:h-45 4k:h-68 8k:h-136 bg-green-100 rounded-full blur-3xl 2k:blur-4xl 4k:blur-6xl 8k:blur-12xl opacity-40 animate-pulse dark:bg-green-900 dark:opacity-30"></div>
        <div className="absolute bottom-20 2k:bottom-27 4k:bottom-40 8k:bottom-80 right-1/4 w-32 2k:w-43 4k:w-64 8k:w-128 h-32 2k:h-43 4k:h-64 8k:h-128 bg-red-100 rounded-full blur-3xl 2k:blur-4xl 4k:blur-6xl 8k:blur-12xl opacity-30 animate-pulse delay-1000 dark:bg-red-900 dark:opacity-20"></div>
        <div className="absolute top-1/3 right-20 2k:right-27 4k:right-40 8k:right-80 w-28 2k:w-37 4k:w-56 8k:w-112 h-28 2k:h-37 4k:h-56 8k:h-112 bg-blue-100 rounded-full blur-3xl 2k:blur-4xl 4k:blur-6xl 8k:blur-12xl opacity-25 animate-pulse delay-500 dark:bg-blue-900 dark:opacity-20"></div>
        
        <div className="absolute bottom-10 2k:bottom-13 4k:bottom-20 8k:bottom-40 right-20 2k:right-27 4k:right-40 8k:right-80 w-40 2k:w-53 4k:w-80 8k:w-160 h-40 2k:h-53 4k:h-80 8k:h-160 bg-muted rounded-full blur-3xl 2k:blur-4xl 4k:blur-6xl 8k:blur-12xl opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 2k:w-85 4k:w-128 8k:w-256 h-64 2k:h-85 4k:h-128 8k:h-256 bg-muted rounded-full blur-4xl 2k:blur-5xl 4k:blur-8xl 8k:blur-16xl opacity-10"></div>

        {/* Клеточный фон */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:4rem_4rem] 2k:bg-[size:5.32rem_5.32rem] 4k:bg-[size:8rem_8rem] 8k:bg-[size:16rem_16rem] dark:bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)]"></div>

        {/* Badge для пользователя */}
        {user && (
            <div className="absolute top-2 sm:top-6 2k:top-8 4k:top-12 8k:top-24 left-2 sm:left-6 2k:left-8 4k:left-12 8k:left-24 z-30 inline-flex items-center gap-2 2k:gap-3 4k:gap-4 8k:gap-8 px-4 2k:px-5 4k:px-8 8k:px-16 py-2 2k:py-3 4k:py-4 8k:py-8 bg-background/80 backdrop-blur-sm rounded-full border border-border">
              <div className="w-2 2k:w-3 4k:w-4 8k:w-8 h-2 2k:h-3 4k:h-4 8k:h-8 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm 2k:text-base 4k:text-[20px] 8k:text-[40px]">
                  {user.nickname || user.email}
              </span>
            </div>
        )}

        <div className="relative z-20 container mx-auto px-2 sm:px-6 2k:px-8 4k:px-12 8k:px-24 py-20 2k:py-27 4k:py-40 8k:py-80 flex items-center justify-center min-h-[600px] 2k:min-h-[800px] 4k:min-h-[1200px] 8k:min-h-[2400px]">
            {children}
        </div>
    </div>
  );
};