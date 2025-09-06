'use client'
import React from 'react';
import { useCurrencyConverter } from '@/hooks/use-currency-converter';
import { CurrencyConverter, CurrencyRates } from '@/components/shared/currency'
import { allCurrencies, popularCurrencies } from '@/data/currencies';

export const Currency: React.FC = () => {

	const [showAllCurrencies, setShowAllCurrencies] = React.useState(true)
	const currentCurrencies = showAllCurrencies ? allCurrencies : popularCurrencies

	const toggleCurrenciesView = () => {
		setShowAllCurrencies(!showAllCurrencies)
	}

	const {
		amount, fromCurrency, toCurrency, convertedAmount, exchangeRate, conversionRates,
		handleAmountChange, handleFromCurrencyChange, handleToCurrencyChange, swapCurrencies,
		isLoading, error
	} = useCurrencyConverter()
	return (
		<div className='2xl:grid grid-cols-2 items-center gap-x-4'>
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
			<CurrencyRates
				fromCurrency={fromCurrency}
				conversionRates={conversionRates}
				popularCurrencies={popularCurrencies}
				error={error}
			/>
		</div>
	)
}