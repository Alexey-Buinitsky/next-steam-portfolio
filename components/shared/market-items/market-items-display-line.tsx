import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatRating, formatPrice } from '@/lib';
import type { ItemsResponse } from "@/types/steam";

interface Props {
    className?: string;
    data?: ItemsResponse;
}

export const MarketItemsDisplayLine: React.FC<Props> = ({ className, data }) => {
  return (
        <div className={className}>
            <div className='mx-auto xl:w-4/5'>
                <div className='flex items-center justify-between pb-3 pr-2 pl-6'>
                    <p className='sm:mr-4 text-sm lg:text-lg font-semibold'>Name</p>
                    <div className='flex items-center space-x-2 md:space-x-2 xl:space-x-4'>
                        <div className='w-14'><p className='text-right text-sm lg:text-lg font-semibold'>Price</p></div>
                        <div className='w-14'><p className='text-right text-sm lg:text-lg font-semibold'>Rating</p></div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mb-6">
                    {data?.items.map((item) => (
                        <Link
                            href={`/market/item/${encodeURIComponent(item.name)}`}
                            key={item.id}
                            className="flex border rounded py-0.5 pl-2 pr-4 sm:px-4 hover:shadow-md transition-shadow dark:hover:shadow-gray-500 dark:hover:shadow-sm"
                        >
                            <div className="flex items-center w-full">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    height={64}
                                    width={64}
                                    className="w-16 h-16 object-contain md:mr-4"
                                />
                                <div className="flex-grow min-w-0 px-3 md:px-6 self-stretch flex items-center">
                                    <h3 className="text-sm lg:text-lg font-semibold break-words">{item.name}</h3>
                                </div>
                                <div className="flex items-center space-x-4 md:space-x-6">
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
        </div>
    );
};