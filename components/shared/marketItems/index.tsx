'use client'
import { useState, useEffect } from 'react';
import { useMarketItems } from '@/hooks/use-market-items';
import { Button } from '@/components/ui';
import { StretchHorizontal, Grid2X2, Search } from 'lucide-react';
import { formatPrice, formatRating } from '@/lib';
import Link from 'next/link';
import { AppPagination } from '@/components/shared';
import { Input } from '@/components/ui';

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 50;

type DisplayMode = 'grid' | 'list';

export function MarketItems() {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, isError } = useMarketItems(
    currentPage, 
    ITEMS_PER_PAGE, 
    debouncedQuery
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading items</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Trading platform</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
              className='2k:size-12 4k:size-18 8k:size-36'
            >
              <Grid2X2 size={20}/>
            </Button>
            <Button
              onClick={() => setDisplayMode('list')} 
              variant="outline" 
              size="icon" 
              className='2k:size-12 4k:size-18 8k:size-36'
            >
              <StretchHorizontal size={20}/>
            </Button>
          </div>
        </div>
      </div>
      
      {displayMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-12">
          {data?.items.map((item) => (
            <Link href='/'>
                <div key={item.id} className="border rounded p-4 hover:shadow-lg transition-shadow">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-34 object-contain mb-4"
                  />
                  <h3 className="font-bold truncate mb-2">{item.name}</h3>
                  <div className='flex justify-between'>
                      <p className="text-lg text-green-600  dark:text-green-400 font-bold">Price: {formatPrice(item.price)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Rating: {formatRating(item.volume)}</p>
                  </div>
                </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='mx-auto xl:w-4/5'>
            <div className='flex items-center justify-between p-3'>
                <p className='sm:mr-4 text-lg font-semibold'>Name</p>
                <div className='flex items-center space-x-4 md:space-x-6 xl:space-x-18'>
                    <div><p className='text-right text-lg font-semibold'>Price</p></div>
                    <div><p className='text-right text-lg font-semibold'>Rating</p></div>
                </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
                {data?.items.map((item) => (
                    <Link 
                      href='/' 
                      key={item.id}
                      className="flex border rounded pr-2 sm:px-4 hover:shadow-md transition-shadow dark:hover:shadow-gray-500 dark:hover:shadow-sm"
                    >
                      <div className="flex items-center w-full">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-contain md:mr-4"
                        />
                        <div className="flex-grow min-w-0 px-3 md:px-6 self-stretch flex items-center">
                          <h3 className="text-sm lg:text-lg font-semibold break-words">{item.name}</h3>
                        </div>
                        <div className="flex items-center space-x-2 md:space-x-6">
                          <div className="text-right">
                            <p className="text-sm lg:text-lg text-green-600 dark:text-green-400 font-bold">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <div className="text-right w-7">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatRating(item.volume)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                ))}
            </div>
        </div>
      )}
      <AppPagination 
        currentPage={currentPage} 
        totalPages={Math.min(MAX_PAGES, Math.ceil((data?.total || 0) / ITEMS_PER_PAGE))} 
        onPageChange={setCurrentPage}
      />
    </div>
  );
}