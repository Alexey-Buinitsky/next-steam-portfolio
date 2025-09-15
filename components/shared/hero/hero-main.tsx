import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { AuthModal } from '@/components/shared';
import { useAuthCheck } from '@/hooks';
import { ArrowRight } from 'lucide-react';

interface Props {
    className?: string;
}

export const HeroMain: React.FC<Props> = ({ className }) => {
    const { user, isAuthenticated } = useAuthCheck();
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

    const handleGetStarted = () => {
        if (!isAuthenticated) {
            setIsAuthModalOpen(true);
        }
    }

    return (
        <div className={className}>
            <div className="text-center max-w-4xl 2k:max-w-6xl 4k:max-w-[1792px] 8k:max-w-[3584px]">
                <h1 className="text-5xl md:text-6xl 2k:text-[78px] 4k:text-[120px] 8k:text-[240px] font-bold mb-6 2k:mb-8 4k:mb-12 8k:mb-24">
                    Create Your CS2 Portfolio
                </h1>
                
                <p className="text-xl 2k:text-3xl 4k:text-[40px] 8k:text-[80px] text-muted-foreground mb-8 2k:mb-10 4k:mb-16 8k:mb-32 max-w-2xl 2k:max-w-4xl 4k:max-w-[1344px] 8k:max-w-[2688px] mx-auto leading-relaxed">
                    Track your skins, analyze profits, and dominate the market with real-time analytics
                </p>

                <div className="flex flex-col sm:flex-row gap-4 2k:gap-5 4k:gap-8 8k:gap-16 justify-center items-center">
                    {user ? (
                        <Button 
                            size="lg"
                            className="px-8 2k:px-10 4k:px-16 8k:px-32 py-6 2k:py-8 4k:py-12 8k:py-24 text-lg 2k:text-xl 4k:text-[30px] 8k:text-[60px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 text-white shadow-lg hover:shadow-green-500/25"
                            asChild
                        >
                            <Link href="/portfolio">
                                Go to Portfolio
                                <ArrowRight className="w-5 2k:w-7 4k:w-10 8k:w-20 h-5 2k:h-7 4k:h-10 8k:h-20 ml-2 2k:ml-3 4k:ml-4 8k:ml-8" />
                            </Link>
                        </Button>
                    ) : (
                        <Button 
                            size="lg"
                            className="px-8 2k:px-10 4k:px-16 8k:px-32 py-6 2k:py-8 4k:py-12 8k:py-24 text-lg 2k:text-xl 4k:text-[30px] 8k:text-[60px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 text-white shadow-lg hover:shadow-green-500/25"
                            onClick={handleGetStarted}
                        >
                            Start Tracking Now
                            <ArrowRight className="w-5 2k:w-7 4k:w-10 8k:w-20 h-5 2k:h-7 4k:h-10 8k:h-20 ml-2 2k:ml-3 4k:ml-4 8k:ml-8" />
                        </Button>
                    )}
                    
                    <Button 
                        variant="outline" 
                        size="lg"
                        className="px-8 2k:px-10 4k:px-16 8k:px-32 py-6 2k:py-8 4k:py-12 8k:py-24 text-lg 2k:text-xl 4k:text-[30px] 8k:text-[60px] border-border hover:bg-accent"
                        asChild
                    >
                        <Link href="/market">
                            Browse Market
                        </Link>
                    </Button>
                </div>
                
                {/* Регалии */}
                <div className="mt-16 2k:mt-21 4k:mt-32 8k:mt-64 flex items-center">
                    <div className="text-center flex-1">
                        <div className="text-2xl sm:text-3xl 2k:text-4xl 4k:text-[60px] 8k:text-[120px] font-bold text-cyan-600 dark:text-cyan-400 mb-2 2k:mb-3 4k:mb-4 8k:mb-8">10K+</div>
                        <div className="text-sm 2k:text-base 4k:text-[24px] 8k:text-[48px] text-gray-600 dark:text-gray-300">Items Tracked</div>
                    </div>
                    <div className="text-center flex-1">
                        <div className="text-2xl sm:text-3xl 2k:text-4xl 4k:text-[60px] 8k:text-[120px] font-bold text-red-600 dark:text-red-400 mb-2 2k:mb-3 4k:mb-4 8k:mb-8">$2.1M+</div>
                        <div className="text-sm 2k:text-base 4k:text-[24px] 8k:text-[48px] text-gray-600 dark:text-gray-300">Total Profit</div>
                    </div>
                    <div className="text-center flex-1">
                        <div className="text-2xl sm:text-3xl 2k:text-4xl 4k:text-[60px] 8k:text-[120px] font-bold text-amber-600 dark:text-amber-400 mb-2 2k:mb-3 4k:mb-4 8k:mb-8">24/7</div>
                        <div className="text-sm 2k:text-base 4k:text-[24px] 8k:text-[48px] text-gray-600 dark:text-gray-300">Market Updates</div>
                    </div>
                </div>
            </div>

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        </div>
    )
};