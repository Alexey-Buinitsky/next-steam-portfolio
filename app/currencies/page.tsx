'use client'
import { useState } from 'react';
import { useCurrencyConverter } from '@/hooks/use-currency-converter';
import { CurrencyConverter, CurrencyRates } from '@/components/shared'

export default function Currencies() {
  const allCurrencies = ["USD", "EUR", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XCG", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"]
  const popularCurrencies = [ 'USD', 'BYN', 'RUB', 'UAH', 'EUR', 'CNY', 'GBP', 'NOK', 'CHF', 'PLN', 'BRL', 'IDR', 'MYR', 'PHP', 'SGD', 'THB', 'VND', 'KRW', 'MXN', 'CAD', 'AUD', 'NZD', 'JPY', 'INR', 'CLP', 'PEN', 'COP', 'ZAR', 'HKD', 'TWD', 'SAR', 'AED', 'ILS', 'KZT', 'KWD', 'QAR', 'CRC', 'UYU'];

  const [showAllCurrencies, setShowAllCurrencies] = useState(true);
  const currentCurrencies = showAllCurrencies ? allCurrencies : popularCurrencies;

  const toggleCurrenciesView = () => {
    setShowAllCurrencies(!showAllCurrencies);
  };

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
  );
}


