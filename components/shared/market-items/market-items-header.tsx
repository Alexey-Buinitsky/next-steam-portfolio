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
            <div className="flex flex-col gap-4 2k:gap-5 4k:gap-8 8k:gap-16 justify-between items-center mb-4 2k:mb-5 4k:mb-8 8k:mb-16">
                <h1 className="self-start text-2xl 2k:text-3xl 4k:text-5xl 8k:text-8xl font-bold">Trading platform</h1>

                <div className="flex justify-between md:flex-row gap-4 2k:gap-5 4k:gap-8 8k:gap-16 w-full">
                    <div className="relative w-full md:w-92 2k:md:w-122 4k:md:w-184 8k:md:w-368">
                        <Search size={16} className="absolute left-3 2k:left-4 4k:left-6 8k:left-12 top-1/2 -translate-y-1/2 text-muted-foreground select-none pointer-events-none w-4 2k:w-5 4k:w-8 8k:w-16 h-4 2k:h-5 4k:h-8 8k:h-16" />
                        <Label className="sr-only" htmlFor="filter">Type to search</Label>
                        <Input
                            placeholder="Search items..."
                            className="pl-9 2k:pl-12 4k:pl-18 8k:pl-36 text-base 2k:text-lg 4k:text-3xl 8k:text-6xl h-10 2k:h-13 4k:h-20 8k:h-40"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 2k:gap-3 4k:gap-4 8k:gap-8">
                        <Button
                            onClick={() => setDisplayMode('grid')}
                            variant="outline"
                            size="icon"
                            className="w-9 2k:w-12 4k:w-18 8k:w-36 h-9 2k:h-12 4k:h-18 8k:h-36"
                        >
                            <Grid2X2 className="w-5 2k:w-7 4k:w-10 8k:w-20 h-5 2k:h-7 4k:h-10 8k:h-20" />
                        </Button>
                        <Button
                            onClick={() => setDisplayMode('list')}
                            disabled={!user ? true : false}
                            variant="outline"
                            size="icon"
                            className="w-9 2k:w-12 4k:w-18 8k:w-36 h-9 2k:h-12 4k:h-18 8k:h-36"
                        >
                            <StretchHorizontal className="w-5 2k:w-7 4k:w-10 8k:w-20 h-5 2k:h-7 4k:h-10 8k:h-20" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}