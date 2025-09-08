import React from 'react';
import { ConversionRate } from '@/types/currencies';

interface Props {
  fromCurrency: string;
  conversionRates: ConversionRate | undefined;
  popularCurrencies: string[];
  error: Error | null;
}

export const CurrencyRates:React.FC<Props> = React.memo(function CurrencyRates({
  fromCurrency,
  conversionRates,
  popularCurrencies,
  error
}) {
  return (
    <div className='mx-auto bg-gray-50 dark:bg-[var(--card)] rounded-lg p-6 mt-4 md:mt-10'>
      <h2 className='text-2xl font-bold mb-6'>
        Currency Exchange Rates to <span className='text-green-600 dark:text-green-400'>{fromCurrency}</span>
      </h2>
      {error ? (  
        <div className='text-red-500 p-4 bg-red-50 rounded'>{error.message}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-3 gap-x-10 ">
          {conversionRates && Object.entries(conversionRates)
            .filter(([currency]) => popularCurrencies.includes(currency))
            .map(([currency, rate]) => (
              <div key={currency} className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-[var(--accent)] rounded">
                <span className="font-medium w-10">{currency}</span>
                <span className="text-gray-500 dark:text-zinc-500 flex-1 text-right">
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