import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatRating, formatPrice } from '@/lib';
import type { ItemsResponse } from "@/types/steam";

interface Props {
    className?: string;
    data?: ItemsResponse
}

export const MarketItemsDisplayGrid: React.FC<Props> = ({ className, data }) => {
  return (
    <div className={className}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-12">
            {data?.items.map((item) => (
                <Link href={`/market/item/${encodeURIComponent(item.name)}`} key={item.id}>
                    <div className="h-full border rounded p-4 hover:shadow-lg transition-shadow">
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={136}
                            height={136}
                            className="w-full h-34 object-contain mb-4"
                        />
                        <h3 className="font-bold truncate mb-2">{item.name}</h3>
                        <div className='flex justify-between'>
                            <p className="flex-2 2xl:flex-auto text-lg xl:text-sm 2xl:text-lg text-green-600  dark:text-green-400 font-bold">Price: {formatPrice(item.price)}</p>
                            <p className="flex-1 2xl:flex-auto text-sm text-gray-600 dark:text-gray-400 text-right">Rating: {formatRating(item.volume)}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  );
};