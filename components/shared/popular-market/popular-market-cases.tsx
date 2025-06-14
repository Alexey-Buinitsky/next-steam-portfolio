'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib';
// import { usePopularCases } from '@/hooks';
import { useTotalItems } from '@/hooks/use-total-items';
import Slider from '../slider';

import type { SteamMarketItem } from '@/types/steam';

import { tempData } from '@/data/temp-data';

interface Props {
  className?: string;
}

export const PopularMarketCases: React.FC<Props> = ({ className }) => {
  const { data: items, isLoading, error } = useTotalItems()

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredCases = (data: SteamMarketItem[]): SteamMarketItem[] => {
    return data.filter((item: SteamMarketItem) => item?.asset_description?.type === 'Base Grade Container' && item?.hash_name?.toLowerCase().includes('case'))
  } 

  console.log(
    filteredCases(tempData)
  );

  const cases = filteredCases(tempData)

  return (
    <div className={className} >
      <Slider 
        autoplayEnabled={false} 
        style={{ maxWidth: '80vw'}}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          568: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1400: { slidesPerView: 4, spaceBetween: 25 },
          1920: { slidesPerView: 6, spaceBetween: 30 },
          2560: { slidesPerView: 7, spaceBetween: 40 }, // Для 4K
        }}
        >
        {cases?.map((item: SteamMarketItem) => (
          <Link href='/' key={item.hash_name}>
            <div className="border rounded-lg p-3 hover:shadow-md transition-shadow dark:hover:shadow-gray-500">
              <Image className="mx-auto w-auto h-auto object-contain mb-2" 
                src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.asset_description?.icon_url || ''}`} 
                alt={item.hash_name || ''} 
                width={104} height={104}
              />
              <h3 className="font-bold text-sl truncate dark:text-white">{item.name || 'Unknown'}</h3>
              <p className="text-green-600 font-bold dark:text-green-400">{item.sell_price_text || ''}</p>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};