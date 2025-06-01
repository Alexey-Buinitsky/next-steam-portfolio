'use client'
import { useState } from 'react';
import { usePopularItems } from '@/hooks/use-popular-items';
// import { Pagination } from '@/components/shared';
import { Button } from '@/components/ui';
import { StretchHorizontal, Grid2X2 } from 'lucide-react';
import { formatPrice, formatRating } from '@/lib';
import Link from 'next/link';
import { AppPagination } from '@/components/shared';

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 50;

type DisplayMode = 'grid' | 'list';

export function MarketItems() {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');
  const { data, isLoading, isError } = usePopularItems(currentPage, ITEMS_PER_PAGE);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading items</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Trading platform</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setDisplayMode('grid')} variant="outline" size="icon" className='2k:size-12 4k:size-18 8k:size-36'
          >
            <Grid2X2 size={20}/>
          </Button>
          <Button
            onClick={() => setDisplayMode('list')} variant="outline" size="icon" className='2k:size-12 4k:size-18 8k:size-36'
            >
              <StretchHorizontal size={20}/>
          </Button>
        </div>
      </div>
      
      {displayMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
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
                <p className='mr-4 text-lg font-semibold ml-21'>Name</p>
                <div className='flex items-center space-x-6'>
                    <div><p className='text-right text-lg font-semibold'>Price</p></div>
                    <div className='w-20'><p className='text-right text-lg font-semibold'>Rating</p></div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {data?.items.map((item) => (
                    <Link href='/'>
                        <div key={item.id} className="flex items-center border rounded px-4 hover:shadow-md transition-shadow dark:hover:shadow-gray-500 dark:hover:shadow-sm">
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-contain mr-4"
                        />
                        <div className="flex-grow min-w-0">
                            <h3 className="text-lg font-semibold truncate">{item.name}</h3>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="text-right">
                            <p className="text-lg text-green-600  dark:text-green-400 font-bold">{formatPrice(item.price)}</p>
                            </div>
                            <div className="w-20 text-right">
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

      {/* <Pagination
        currentPage={currentPage}
        totalPages={Math.min(MAX_PAGES, Math.ceil((data?.total || 0) / ITEMS_PER_PAGE))}
        onPageChange={setCurrentPage}
      /> */}
    </div>
  );
}