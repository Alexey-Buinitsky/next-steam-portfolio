'use client'

import React from 'react';
import Image from 'next/image';
import { useImageError } from '@/hooks';
import { formatRating, formatPrice } from '@/lib';
import { AddToPortfolioPanel, MarketItemsDisplayLineHeader } from '@/components/shared';
import noImage from '@/public/images/no-image.png'

import type { AssetsResponse } from "@/types/portfolio";

interface Props {
    className?: string;
    data?: AssetsResponse;
}

export const MarketItemsDisplayLine: React.FC<Props> = ({ className, data }) => {
    const [selectedItem, setSelectedItem] = React.useState<AssetsResponse['assets'][0] | null>(data?.assets?.[0] || null)
    const {imageErrors, handleImageError} = useImageError()

    return (
        <div className={`${className} flex flex-col items-center justify-between xl:gap-10 2k:xl:gap-13 4k:xl:gap-20 8k:xl:gap-40 xl:flex-row xl:items-start`}>
             <div className='w-full'> 
                <MarketItemsDisplayLineHeader />
                
                <div className="flex flex-col gap-2 2k:gap-3 4k:gap-4 8k:gap-8 mb-6 2k:mb-8 4k:mb-12 8k:mb-24">
                    {data?.assets.map((item) => (
                        <div 
                            key={item.id}
                            className="flex items-center w-full border bg-card rounded-lg py-0.5 2k:py-1 4k:py-2 8k:py-4 px-2 2k:px-3 4k:px-4 8k:px-8 sm:pr-4 2k:sm:pr-5 4k:sm:pr-8 8k:sm:pr-16 2xl:px-10 2k:2xl:px-13 4k:2xl:px-20 8k:2xl:px-40 hover:shadow-md transition-shadow dark:hover:shadow-gray-500 dark:hover:shadow-sm cursor-pointer"
                            onClick={() => setSelectedItem(item)}    
                        >
                            <Image
                                src={!item.imageUrl || imageErrors[item.id] ? noImage : `https://steamcommunity-a.akamaihd.net/economy/image/${item.imageUrl}`} 
                                alt={item.name || ''} 
                                height={64}
                                width={64}
                                className="w-16 2k:w-21 4k:w-32 8k:w-64 h-16 2k:h-21 4k:h-32 8k:h-64 object-contain mr-auto 2xl:mr-7 2k:2xl:mr-9 4k:2xl:mr-14 8k:2xl:mr-28"
                                loading='lazy'
                                onError={() => handleImageError(item.id)}
                            />
                            <div className="flex-grow min-w-0 px-3 2k:px-4 4k:px-6 8k:px-12 md:px-6 2k:md:px-8 4k:md:px-12 8k:md:px-24 self-stretch flex items-center ">
                                <h3 className="text-sm 2k:text-2xl 4k:text-4xl 8k:text-7xl lg:text-lg font-semibold break-words line-clamp-3">{item.name}</h3>
                            </div>
                            <div className="flex items-center space-x-4 2k:space-x-5 4k:space-x-8 8k:space-x-16 md:space-x-6 2k:md:space-x-8 4k:md:space-x-12 8k:md:space-x-24">
                                <div className="text-right">
                                    <p className="text-sm 2k:text-2xl 4k:text-4xl 8k:text-7xl lg:text-lg text-green-600 dark:text-green-400 font-bold">
                                        {formatPrice(item.price || undefined)}
                                    </p>
                                </div>
                                <div className="text-right w-7 2k:w-9 4k:w-14 8k:w-28">
                                    <p className="text-sm 2k:text-xl 4k:text-3xl 8k:text-6xl text-gray-600 dark:text-gray-400">
                                        {formatRating(item.volume || undefined)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedItem && (
                <div className='xl:pt-10 2k:xl:pt-13 4k:xl:pt-20 8k:xl:pt-40 w-full md:w-auto md:min-w-120 2k:md:min-w-160 4k:md:min-w-240 8k:md:min-w-480 lg:min-w-144 2k:lg:min-w-192 4k:lg:min-w-288 8k:lg:min-w-576 xl:min-w-96 2k:xl:min-w-128 4k:xl:min-w-192 8k:xl:min-w-384 2xl:min-w-124 2k:2xl:min-w-165 4k:2xl:min-w-248 8k:2xl:min-w-496'>
                    <AddToPortfolioPanel item={selectedItem}/>
                </div>
            )}  
        </div>
    )
}
