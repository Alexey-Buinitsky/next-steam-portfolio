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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-12">
                {data?.assets.map((item) => (
                    <div 
                        key={item.id}
                        className="h-full bg-card border rounded p-4 hover:shadow-lg transition-shadow cursor-pointer" 
                        onClick={() => setSelectedItem(item)}
                    >
                        <Image
                            src={imageErrors[item.id] ? `${noImage}` : `https://steamcommunity-a.akamaihd.net/economy/image/${item.imageUrl || ''}`}  
                            alt={item.name || ''} 
                            width={136}
                            height={136}
                            className="w-full h-32 object-contain mb-4"
                            loading='lazy'
                            onError={() => handleImageError(item.id)}
                        />
                        <h3 className="font-bold truncate mb-2">{item.name}</h3>
                        <div className='flex justify-between'>
                            <p className="flex-2 2xl:flex-auto text-lg xl:text-sm 2xl:text-lg text-green-600  dark:text-green-400 font-bold">Price: {formatPrice(item.price || undefined)}</p>
                            <p className="flex-1 2xl:flex-auto text-sm text-gray-600 dark:text-gray-400 text-right">Rating: {formatRating(item.volume || undefined)}</p>
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