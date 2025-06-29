import React, { useState }  from 'react';
import Image from 'next/image';
import { formatRating, formatPrice } from '@/lib';
import { AddToPortfolioPanel } from '../index';

import type { AssetsResponse } from "@/types/portfolio";

interface Props {
    className?: string;
    data?: AssetsResponse;
}

export const MarketItemsDisplayLine: React.FC<Props> = ({ className, data }) => {
    const [selectedItem, setSelectedItem] = useState<{
        id: number;
        name: string;
        price: number;
        imageUrl: string;
    } | null>(data?.assets?.[0] ? {
        id: data?.assets[0].id || 0,
        name:  data?.assets[0].name || '',
        price: data?.assets[0].price || 0,
        imageUrl: data?.assets[0].imageUrl || ''
    } : null);
    
    return (
        <div className={`${className} flex items-start justify-between gap-10`}>
            <div className='mx-auto xl:w-4/5'>
                <div className='flex items-center justify-between pb-3 pr-2 pl-6'>
                    <p className='sm:mr-4 text-sm lg:text-lg font-semibold'>Name</p>
                    <div className='flex items-center space-x-2 md:space-x-2 xl:space-x-4'>
                        <div className='w-14'><p className='text-right text-sm lg:text-lg font-semibold'>Price</p></div>
                        <div className='w-14'><p className='text-right text-sm lg:text-lg font-semibold'>Rating</p></div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mb-6">
                    {data?.assets.map((item) => (
                        <div 
                            key={item.id}
                            className="flex items-center w-full border rounded py-0.5 pl-2 pr-4 sm:px-4 hover:shadow-md transition-shadow dark:hover:shadow-gray-500 dark:hover:shadow-sm cursor-pointer"
                            onClick={() => setSelectedItem({
                                id: item.id,
                                name: item.name || '',
                                price: item.price || 0,
                                imageUrl: item.imageUrl || ''
                            })}    
                        >
                            <Image
                                src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.imageUrl || ''}`} 
                                alt={item.name || ''} 
                                height={64}
                                width={64}
                                className="w-16 h-16 object-contain md:mr-4"
                                loading='lazy'
                            />
                            <div className="flex-grow min-w-0 px-3 md:px-6 self-stretch flex items-center">
                                <h3 className="text-sm lg:text-lg font-semibold break-words">{item.name}</h3>
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
                <div className='pt-10'>
                    <AddToPortfolioPanel 
                        itemId={selectedItem.id}
                        itemName={selectedItem.name}
                        itemPrice={selectedItem.price / 100}
                        itemImageUrl={selectedItem.imageUrl}
                    />
                </div>
            )}
        </div>
    );
};