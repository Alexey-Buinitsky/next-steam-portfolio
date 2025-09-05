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
            <div className="text-center max-w-4xl">
                {/* Live market tracking badge */}
                {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 dark:bg-white/10 dark:border-white/20 mb-6">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-200">Live market tracking</span>
                </div> */}
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    Create Your CS2 Portfolio
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
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
                        className="px-8 py-6 text-lg border-border hover:bg-accent"
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

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        </div>
    )
};