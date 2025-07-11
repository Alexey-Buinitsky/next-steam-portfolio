'use client'

import React, { useState }  from 'react';
import Image from 'next/image';
import { formatRating, formatPrice } from '@/lib';
import { AddToPortfolioPanel, MarketItemsDisplayLineHeader } from '../index';

import type { AssetsResponse } from "@/types/portfolio";

interface Props {
    className?: string;
    data?: AssetsResponse;
}

export const MarketItemsDisplayLine: React.FC<Props> = ({ className, data }) => {
    const [selectedItem, setSelectedItem] = useState<AssetsResponse['assets'][0] | null>(data?.assets?.[0] || null);
    
    return (
        <div className={`${className} flex flex-col items-center justify-between xl:gap-10 xl:flex-row xl:items-start`}>
            <div className='w-full'>
                <MarketItemsDisplayLineHeader />
                
                <div className="flex flex-col gap-2 mb-6">
                    {data?.assets.map((item) => (
                        <div 
                            key={item.id}
                            className="flex items-center w-full border rounded py-0.5 px-2 sm:pr-4 2xl:px-10 hover:shadow-md transition-shadow dark:hover:shadow-gray-500 dark:hover:shadow-sm cursor-pointer"
                            onClick={() => setSelectedItem(item)}    
                        >
                            <Image
                                src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.imageUrl || ''}`} 
                                alt={item.name || ''} 
                                height={64}
                                width={64}
                                className="w-16 h-16 object-contain mr-auto 2xl:mr-7"
                                loading='lazy'
                            />
                            <div className="flex-grow min-w-0 px-3 md:px-6 self-stretch flex items-center ">
                                <h3 className="text-sm lg:text-lg font-semibold break-words line-clamp-3">{item.name}</h3>
                            </div>
                            <div className="flex items-center space-x-4 md:space-x-6">
                                <div className="text-right">
                                    <p className="text-sm lg:text-lg text-green-600 dark:text-green-400 font-bold">
                                        {formatPrice(item.price || undefined)}
                                    </p>
                                </div>
                                <div className="text-right w-7">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {formatRating(item.volume || undefined)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedItem && (
                <div className='xl:pt-10'>
                    <AddToPortfolioPanel item={selectedItem}/>
                </div>
            )}
        </div>
    );
};