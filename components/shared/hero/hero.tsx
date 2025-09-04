'use client'

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HeroMessage, AuthModal } from '@/components/shared';
import { Button } from '@/components/ui';
import { useAuthCheck } from '@/hooks';

export const Hero: React.FC = () => {
    const { user, isAuthenticated } = useAuthCheck();
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
    
    const handleGetStarted = () => {
        if (!isAuthenticated) {
            setIsAuthModalOpen(true);
        }
    }

    return (
        <div className="relative min-h-[600px] overflow-hidden">
            
            {/* Мигающие элементы - светлая тема */}
            <div className="absolute top-30 left-60 w-34 h-34 bg-green-100 rounded-full blur-3xl opacity-40 animate-pulse dark:bg-green-900 dark:opacity-30"></div>
            <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000 dark:bg-red-900 dark:opacity-20"></div>
            <div className="absolute top-1/3 right-20 w-28 h-28 bg-blue-100 rounded-full blur-3xl opacity-25 animate-pulse delay-500 dark:bg-blue-900 dark:opacity-20"></div>
            
            <div className="absolute bottom-10 right-20 w-40 h-40 bg-gray-200 rounded-full blur-3xl opacity-15 dark:bg-gray-800 dark:opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-100 rounded-full blur-4xl opacity-10 dark:bg-gray-800 dark:opacity-10"></div>

            {/* === НАСТРОЙКА КЛЕТОЧНОГО ФОНА === */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)]"></div>

            {/* Badge для пользователя  */}
            {user && (
                <div className="absolute top-2 sm:top-6 left-2 sm:left-6 z-30 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 dark:bg-white/10 dark:border-white/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                        {user.nickname || user.email}
                    </span>
                </div>
            )}

            <div className="relative z-20 container mx-auto px-2 sm:px-6 py-20 flex items-center justify-center min-h-[600px]">
                <div className="text-center max-w-4xl">
                    {/* Live market tracking badge */}
                    {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 dark:bg-white/10 dark:border-white/20 mb-6">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700 dark:text-gray-200">Live market tracking</span>
                    </div> */}
                    
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                        Create Your CS2 Portfolio
                    </h1>
                    
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Track your skins, analyze profits, and dominate the market with real-time analytics
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {user ? (
                            <Button 
                                size="lg"
                                className="px-8 py-6 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 text-white shadow-lg hover:shadow-green-500/25"
                                asChild
                            >
                                <Link href="/portfolio">
                                    Go to Portfolio
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        ) : (
                            <Button 
                                size="lg"
                                className="px-8 py-6 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 text-white shadow-lg hover:shadow-green-500/25"
                                onClick={handleGetStarted}
                            >
                                Start Tracking Now
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        )}
                        
                        <Button 
                            variant="outline" 
                            size="lg"
                            className="px-8 py-6 text-lg border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800/50"
                            asChild
                        >
                            <Link href="/market">
                                Browse Market
                            </Link>
                        </Button>
                    </div>
                    
                    {/* Регалии */}
                    <div className="mt-16 flex items-center">
                        <div className="text-center flex-1">
                            <div className="text-2xl sm:text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">10K+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Items Tracked</div>
                        </div>
                        <div className="text-center flex-1">
                            <div className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400 mb-2">$2.1M+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Total Profit</div>
                        </div>
                        <div className="text-center flex-1">
                            <div className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">24/7</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Market Updates</div>
                        </div>
                    </div>
                </div>
            </div>

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        </div>
    )
}