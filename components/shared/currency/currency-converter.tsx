'use client'

import { Button, Input } from '@/components/ui';
import { InfiniteScrollSelect } from '@/components/shared';

interface Props {
  amount: string, 
  fromCurrency: string, 
  toCurrency: string, 
  convertedAmount: string, 
  exchangeRate: number, 
  currentCurrencies: string[],
  showAllCurrencies: boolean, 
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  handleFromCurrencyChange: (currency: string) => void, 
  handleToCurrencyChange: (currency: string) => void, 
  toggleCurrenciesView: () => void, 
  swapCurrencies: () => void, 
  isLoading: boolean, 
  error: string | null
}

export const CurrencyConverter: React.FC<Props> = ({
  showAllCurrencies, toggleCurrenciesView, currentCurrencies,
  amount, fromCurrency, toCurrency, convertedAmount, exchangeRate, 
  handleAmountChange, handleFromCurrencyChange, handleToCurrencyChange, swapCurrencies, 
  isLoading, error
}) => {
  return (
     <div className="w-full max-w-[780px] mx-auto lg:p-6 lg:grid grid-cols-1 lg:grid-cols-[max-content_1fr] items-start justify-center gap-x-6 gap-y-6">
      <Button 
        className={`order-1 lg:order-none p-4 lg:p-6 text-lg lg:mt-[198px] mb-6 md:mb-0
          ${showAllCurrencies 
            ? "text-gray-500 dark:text-zinc-500" 
            : "border-green-600 hover:border-green-700 text-black dark:text-white dark:border-green-600"
          }
        `}
        variant='outline' 
        onClick={toggleCurrenciesView}
      >
        Popular
      </Button>

      <div className="w-full order-2 lg:order-none">
        <h2 className="text-3xl font-bold mb-6 text-center">Currency Converter</h2>
        <div className='flex flex-col items-center mb-6'>
          <label htmlFor="amount" className="block text-xl font-medium text-gray-700 dark:text-zinc-500 mb-1">
            Amount
          </label>
          <div className="[&_input]:text-2xl [&_input]:text-center [&_input]:placeholder:text-centermd:[&_input]:text-xllg:[&_input]:text-2xl2k:[&_input]:text-[21px] 4k:[&_input]:text-[32px] 8k:[&_input]:text-[64px]">
            <Input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="max-w-xs py-6"
              min={1}
            />
          </div>
        </div>

        <div className="flex items-center gap-x-2 md:gap-x-6 mb-10">
          <InfiniteScrollSelect 
            value={fromCurrency}
            onValueChange={handleFromCurrencyChange}
            options={currentCurrencies}
            disabled={isLoading}
            placeholder="Select currency"
            id="fromCurrency"
            label="From"
            className="flex-1"
          />

          <Button
            onClick={swapCurrencies}
            className="mt-8 p-6 text-xl"
            disabled={isLoading}
            size={'icon'}
            variant={'ghost'}
            aria-label="Swap currencies"
          >
            ↔
          </Button>

          <InfiniteScrollSelect
            value={toCurrency}
            onValueChange={handleToCurrencyChange}
            options={currentCurrencies}
            disabled={isLoading}
            placeholder="Select currency"
            id="toCurrency"
            label="To"
            className="flex-1"
          />
        </div>

        <div className="flex justify-between items-start p-4 bg-gray-50 dark:bg-[var(--card)] rounded-md min-h-auto lg:min-h-[100px]">
          <div className=''>
            {isLoading ? (
              <div className="text-xl font-semibold">Loading...</div>
            ) : (
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {convertedAmount} {toCurrency}
              </div>
            )}
            {exchangeRate > 0 && !isLoading && (
              <div className="mt-2 text-sm text-gray-500 dark:text-zinc-500">
                1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
              </div>
            )}
          </div>
          <div className="text-lg text-gray-500 dark:text-zinc-500 text-right">Converted Amount</div>
        </div>
      </div>
    </div>
  );
}


