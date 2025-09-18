'use client'

import React from 'react';
import Image from 'next/image';
import { AddToPortfolioModal } from '@/components/shared';
import { useImageError } from '@/hooks';
import { formatRating, formatPrice } from '@/lib';
import noImage from '@/public/images/no-image1.png'

import type { AssetsResponse } from "@/types/portfolio";

interface Props {
    className?: string;
    data?: AssetsResponse;
}

export const MarketItemsDisplayGrid: React.FC<Props> = ({ className, data }) => {
    const { imageErrors, handleImageError } = useImageError()
    const [selectedItem, setSelectedItem] = React.useState<AssetsResponse['assets'][0] | null>(null)

    return (
        <div className={className}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 2k:gap-8 4k:gap-12 8k:gap-24 mb-12 2k:mb-16 4k:mb-24 8k:mb-48">
                {data?.assets.map((item) => (
                    <div 
                        key={item.id}
                        className="h-full bg-card border rounded-lg p-4 2k:p-5 4k:p-8 8k:p-16 hover:shadow-lg transition-shadow cursor-pointer" 
                        onClick={() => setSelectedItem(item)}
                    >
                        <Image
                            src={imageErrors[item.id] ? `${noImage}` : `https://steamcommunity-a.akamaihd.net/economy/image/${item.imageUrl || ''}`}  
                            alt={item.name || ''} 
                            width={136}
                            height={136}
                            className="w-full h-32 2k:h-43 4k:h-64 8k:h-128 object-contain mb-4 2k:mb-5 4k:mb-8 8k:mb-16"
                            loading='lazy'
                            onError={() => handleImageError(item.id)}
                        />
                        <h3 className="font-bold text-base 2k:text-xl 4k:text-3xl 8k:text-6xl truncate mb-2 2k:mb-3 4k:mb-6 8k:mb-16">{item.name}</h3>
                        <div className='flex justify-between'>
                            <p className="flex-2 2xl:flex-auto text-lg xl:text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl text-green-600 dark:text-green-400 font-bold">Price: {formatPrice(item.price || undefined)}</p>
                            <p className="flex-1 2xl:flex-auto text-sm 2k:text-lg 4k:text-2xl 8k:text-5xl text-gray-600 dark:text-gray-400 text-right">Rating: {formatRating(item.volume || undefined)}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedItem && (
                <AddToPortfolioModal 
                    item={selectedItem}
                    open={!!selectedItem}
                    onOpenChange={(open) => !open && setSelectedItem(null)}
                    disableClose={false}
                />
            )}
        </div>
    )
}