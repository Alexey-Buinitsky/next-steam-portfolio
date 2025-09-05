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
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Мигающие элементы */}
        <div className="absolute top-30 left-60 w-34 h-34 bg-green-100 rounded-full blur-3xl opacity-40 animate-pulse dark:bg-green-900 dark:opacity-30"></div>
        <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000 dark:bg-red-900 dark:opacity-20"></div>
        <div className="absolute top-1/3 right-20 w-28 h-28 bg-blue-100 rounded-full blur-3xl opacity-25 animate-pulse delay-500 dark:bg-blue-900 dark:opacity-20"></div>
        
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-muted rounded-full blur-3xl opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-muted rounded-full blur-4xl opacity-10"></div>

        {/* Клеточный фон */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)]"></div>

        {/* Badge для пользователя */}
        {user && (
            <div className="absolute top-2 sm:top-6 left-2 sm:left-6 z-30 inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full border border-border">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">
                {user.nickname || user.email}
            </span>
            </div>
        )}

        <div className="relative z-20 container mx-auto px-2 sm:px-6 py-20 flex items-center justify-center min-h-[600px]">
            {children}
        </div>
    </div>
  );
};