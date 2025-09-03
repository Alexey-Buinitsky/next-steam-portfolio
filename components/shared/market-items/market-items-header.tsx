import React from 'react';
import { Button, Input, Label } from '@/components/ui';
import { StretchHorizontal, Grid2X2, Search } from 'lucide-react';
import { useAuthCheck } from '@/hooks';
import { AuthModal } from '../auth';

interface Props {
    className?: string;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setDisplayMode: (mode: 'grid' | 'list') => void;
}

export const MarketItemsHeader: React.FC<Props> = ({ className, searchQuery, setSearchQuery, setDisplayMode }) => {
    const { user } = useAuthCheck()

    return (
        <div className={className}>
            <div className="flex flex-col gap-4 justify-between items-center md:items-start mb-4">
                <h1 className="self-start text-2xl font-bold">Trading platform</h1>

                <div className="flex justify-between md:flex-row gap-4 w-full">
                    <div className="relative w-full md:w-92">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none pointer-events-none" />
                        <Label className="sr-only" htmlFor="filter">Type to search</Label>
                        <Input
                            placeholder="Search items..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={() => setDisplayMode('grid')}
                            variant="outline"
                            size="icon"
                        >
                            <Grid2X2 size={20} />
                        </Button>
                        <Button
                            onClick={() => setDisplayMode('list')}
                            disabled={!user ? true : false}
                            variant="outline"
                            size="icon"
                        >
                            <StretchHorizontal size={20} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            /> */}
        </div>
    )
}