import { useState, useEffect } from "react";
import type { CurrencyData, ConversionRate } from "@/types/currencies";

export function useCurrencyConverter () {
    const [amount, setAmount] = useState<string>('1');
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('EUR');
    const [convertedAmount, setConvertedAmount] = useState<string>('0');
    const [exchangeRate, setExchangeRate] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [conversionRates, setConversionRates] = useState<ConversionRate>({})

    const convertAmount = (value: string, rate: number = exchangeRate) => {
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
            setConvertedAmount('0');
            return;
        }
        const result = (numericValue * rate).toFixed(4);
        setConvertedAmount(result);
    };

    useEffect(() => {
        const fetchExchangeRate = async () => {
            // Если не выбраны обе валюты, ничего не делаем
            if (!fromCurrency || !toCurrency) return;
            
            // Если выбраны одинаковые валюты, устанавливаем курс 1
            if (fromCurrency === toCurrency) {
                setExchangeRate(1);
                setConvertedAmount(amount); // Сумма не меняется
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/exchange?from=${fromCurrency}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: CurrencyData = await response.json();
                
                // Проверяем успешность запроса и наличие conversion_rates
                if (data.result !== "success" || !data.conversion_rates) {
                    throw new Error(data.error || 'Invalid API response format');
                }

                const rate = data.conversion_rates[toCurrency];
                
                if (rate === undefined) {
                    throw new Error(`Currency ${toCurrency} not found in rates`);
                }

                setExchangeRate(rate);
                convertAmount(amount, rate);
                setConversionRates(data.conversion_rates)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchExchangeRate();
    }, [fromCurrency, toCurrency]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount(value);
        convertAmount(value);
    };

    const handleFromCurrencyChange = (currency: string) => {
        setFromCurrency(currency);
    };

    const handleToCurrencyChange = (currency: string) => {
        setToCurrency(currency);
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return {
        amount, fromCurrency, toCurrency, convertedAmount, exchangeRate, conversionRates,
        handleAmountChange, handleFromCurrencyChange, handleToCurrencyChange, swapCurrencies, 
        isLoading, error
    }
}