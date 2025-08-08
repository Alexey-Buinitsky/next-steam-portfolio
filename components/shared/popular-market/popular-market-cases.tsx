'use client';

import React from 'react';
import Image from 'next/image';
import { Slider, AddToPortfolioModal } from '@/components/shared';
import { usePopularCases } from '@/hooks';
import { formatPrice, formatVolume } from '@/lib';

import type { Asset } from '@prisma/client';

interface Props {
  className?: string;
}

export const PopularMarketCases: React.FC<Props> = ({ className }) => {
  const [selectedItem, setSelectedItem] = React.useState<Asset | null>(null)

  const { data, isLoading, error } = usePopularCases()

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={className} >
      <Slider 
        autoplayEnabled={false} 
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          568: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1400: { slidesPerView: 4, spaceBetween: 25 },
          1920: { slidesPerView: 6, spaceBetween: 30 },
          2560: { slidesPerView: 7, spaceBetween: 40 }, // Для 4K
        }}
      >
        {data?.map((item: Asset) => (
          <div 
            key={item.id}
            className="border rounded-lg p-3 hover:shadow-md transition-shadow dark:hover:shadow-gray-500 cursor-pointer"
            onClick={() => setSelectedItem(item)} 
          >
            <Image className="mx-auto w-auto h-auto object-contain mb-2" 
              src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.imageUrl || ''}`} 
              alt={item.name || ''} 
              width={104} height={104}
            />
            <h3 className="font-bold text-sl truncate dark:text-white">{item.name || 'Unknown'}</h3>
            <div className='flex justify-between items-center'>
              <p className="text-green-600 font-bold dark:text-green-400">{formatPrice(item.price || undefined) || ''}</p>
              <p className="text-sm text-gray-500">{formatVolume(item.volume || undefined) || ''}</p>
            </div>
          </div>
        ))}
      </Slider>

      {selectedItem && (
        <AddToPortfolioModal 
          item={selectedItem} 
          open={!!selectedItem}
          onOpenChange={(open) => !open && setSelectedItem(null)}
          disableClose={false}
        />
      )}
    </div>
  );
};