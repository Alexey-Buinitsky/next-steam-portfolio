'use client';
import { useItemHistory } from '@/hooks/use-item-history';
import { formatPrice } from '@/lib/format-price';
import Link from 'next/link';
import { use } from 'react';

interface PageProps {
  params: Promise<{
    itemName: string;
  }>;
}

export default function ItemPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const decodedItemName = decodeURIComponent(unwrappedParams.itemName);
  
  const { 
    data: itemHistory, 
    isLoading, 
    error,
    isError 
  } = useItemHistory(decodedItemName, 30);

  // Функция для получения последнего значения из массива
  const getLastValue = (arr: string[] | undefined) => {
    if (!arr || arr.length === 0) return 'N/A';
    return arr[arr.length - 1];
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">Loading item data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500 text-center">
          Error loading item data: {error?.message || 'Unknown error'}
        </div>
        <div className="mt-4 text-center">
          <Link href="/market" className="text-blue-500 hover:underline">
            ← Back to Market
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">{decodedItemName}</h1>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Price Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Current Price:</span>
                <span className="font-medium">
                  {formatPrice(parseFloat(getLastValue(itemHistory?.price)))}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Volume Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Recent Volume:</span>
                <span className="font-medium">
                  {getLastValue(itemHistory?.volume)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link 
            href="/market" 
            className="inline-flex items-center text-blue-500 hover:underline"
          >
            <span className="mr-1">←</span> Back to Market
          </Link>
        </div>
      </div>
    </div>
  );
}