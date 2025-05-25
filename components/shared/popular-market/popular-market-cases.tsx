'use client';

import React from 'react';
import { usePopularCases } from '@/hooks/use-popular-cases';
import { formatPrice } from '@/lib/format-price';

interface PopularItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Props {
  className?: string;
}

export const PopularMarketCases: React.FC<Props> = ({ className }) => {
  const { data, isLoading, error } = usePopularCases();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {data?.map((item: PopularItem) => (
        <div key={item.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-24 object-contain mb-2"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-item.png';
            }}
          />
          <h3 className="font-medium text-sm truncate">{item.name}</h3>
          <p className="text-green-600 font-bold">{formatPrice(item.price)}</p>
        </div>
      ))}
    </div>
  );
};