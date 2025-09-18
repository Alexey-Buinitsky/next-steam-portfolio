'use client'

import React from 'react';
import { CurrencyConverter, CurrencyRates, CurrencyConverterSkeleton, CurrencyRatesSkeleton } from '@/components/shared'
import { useFetchExchangeRates } from '@/hooks';
import { allCurrencies, popularCurrencies } from '@/data/currencies';

export const Currency: React.FC = () => {

	const [amount, setAmount] = React.useState<string>('1')
	const [fromCurrency, setFromCurrency] = React.useState<string>('USD')
	const [toCurrency, setToCurrency] = React.useState<string>('EUR')
	const [convertedAmount, setConvertedAmount] = React.useState<string>('0')
	const [exchangeRate, setExchangeRate] = React.useState<number>(0)

	const [showAllCurrencies, setShowAllCurrencies] = React.useState(true)
	const currentCurrencies = showAllCurrencies ? allCurrencies : popularCurrencies

	const { rates, isLoading, error } = useFetchExchangeRates({ fromCurrency, toCurrency })

	React.useEffect(() => {
		if (rates && toCurrency && rates[toCurrency] !== undefined) {
			const rate = rates[toCurrency]
			setExchangeRate(rate)
			convertAmount(amount, rate)
		}
	}, [rates, toCurrency, amount])

	const convertAmount = (value: string, rate: number = exchangeRate) => {
    const numericValue = parseFloat(value)
    if (isNaN(numericValue)) {
      setConvertedAmount('0')
      return
    }
    
    if (fromCurrency === toCurrency) {
      setConvertedAmount(value)
      setExchangeRate(1)
      return
    }

    const result = (numericValue * rate).toFixed(4);
    setConvertedAmount(result)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)
    convertAmount(value)
  }

  const handleFromCurrencyChange = (currency: string) => {
    setFromCurrency(currency)
  }

  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency)
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const toggleCurrenciesView = () => {
    setShowAllCurrencies(!showAllCurrencies)
  }

	return (
		<div className='2xl:grid grid-cols-2 items-center gap-x-4 2k:gap-x-6 4k:gap-x-8 8k:gap-x-16'>
			{isLoading ? (
				<CurrencyConverterSkeleton />
			) : (
				<CurrencyConverter
					amount={amount}
					fromCurrency={fromCurrency}
					toCurrency={toCurrency}
					convertedAmount={convertedAmount}
					exchangeRate={exchangeRate}
					currentCurrencies={currentCurrencies}
					showAllCurrencies={showAllCurrencies}
					handleAmountChange={handleAmountChange}
					handleFromCurrencyChange={handleFromCurrencyChange}
					handleToCurrencyChange={handleToCurrencyChange}
					toggleCurrenciesView={toggleCurrenciesView}
					swapCurrencies={swapCurrencies}
					isLoading={isLoading}
					error={error}
				/>
			)}

			{isLoading ? (
				<CurrencyRatesSkeleton />
			) : (
				<CurrencyRates
					fromCurrency={fromCurrency}
					conversionRates={rates}
					popularCurrencies={popularCurrencies}
					error={error}
				/>
			)}
		</div>
	)
}