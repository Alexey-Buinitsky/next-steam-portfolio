import React from 'react';
import { ConversionRate } from '@/types/currencies';

interface Props {
  fromCurrency: string;
  conversionRates: ConversionRate | undefined;
  popularCurrencies: string[];
  error: Error | null;
}

export const CurrencyRates:React.FC<Props> = React.memo(function CurrencyRates({fromCurrency, conversionRates, popularCurrencies, error}) {
  return (
    <div className='mx-auto bg-gray-50 dark:bg-[var(--card)] rounded-lg p-6 2k:p-8 4k:p-12 8k:p-24 mt-4 2k:mt-5 4k:mt-8 8k:mt-16 md:mt-10'>
      <h2 className='text-2xl 2k:text-3xl 4k:text-4xl 8k:text-8xl font-bold mb-6 2k:mb-8 4k:mb-12 8k:mb-24'>
        Currency Exchange Rates to <span className='text-green-600 dark:text-green-400'>{fromCurrency}</span>
      </h2>
      {error ? (  
        <div className='text-red-500 p-4 2k:p-5 4k:p-8 8k:p-16 bg-red-50 rounded text-sm 2k:text-base 4k:text-xl 8k:text-4xl'>{error.message}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-3 gap-x-10 2k:gap-x-13 4k:gap-x-20 8k:gap-x-40">
          {conversionRates && Object.entries(conversionRates)
            .filter(([currency]) => popularCurrencies.includes(currency))
            .map(([currency, rate]) => (
              <div key={currency} className="flex items-center gap-2 2k:gap-3 4k:gap-4 8k:gap-8 p-1 2k:p-2 4k:p-3.5 8k:p-8 hover:bg-gray-100 dark:hover:bg-[var(--accent)] rounded">
                <span className="font-medium w-10 2k:w-13 4k:w-20 8k:w-40 text-base 2k:text-xl 4k:text-3xl 8k:text-6xl">{currency}</span>
                <span className="text-gray-500 dark:text-zinc-500 flex-1 text-right text-base 2k:text-xl 4k:text-3xl 8k:text-6xl">
                  {rate.toFixed(4)}
                </span>
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
})