import React, {useState} from 'react';
import Image from 'next/image';
import { formatRating, formatPrice } from '@/lib';
import type { AssetsResponse } from "@/types/portfolio";
import { AddToPortfolioModal } from '../add-to-portfolio-modal';

interface Props {
    className?: string;
    data?: AssetsResponse
}

export const MarketItemsDisplayGrid: React.FC<Props> = ({ className, data }) => {
    const [selectedItem, setSelectedItem] = useState<{
        id: number;
        name: string;
        price: number;
        imageUrl: string;
    } | null>(null);

  return (
    <div className={className}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-12">
            {data?.assets.map((item) => (
                <div 
                    className="h-full border rounded p-4 hover:shadow-lg transition-shadow cursor-pointer" 
                    key={item.id}
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
                        width={136}
                        height={136}
                        className="w-full h-34 object-contain mb-4"
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
            itemId={selectedItem.id}
            itemName={selectedItem.name}
            itemPrice={selectedItem.price / 100}
            itemImageUrl={selectedItem.imageUrl}
            onClose={() => setSelectedItem(null)}
            onAdd={() => {
                setSelectedItem(null);
            }}
          />
        )}
    </div>
  );
};