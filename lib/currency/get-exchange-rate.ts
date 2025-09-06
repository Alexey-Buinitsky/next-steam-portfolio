import { CurrencyData } from "@/types/currencies";

export const getExchangeRate = async (fromCurrency: string, toCurrency: string): Promise<number> => {
  if (fromCurrency === toCurrency) return 1

  try {
		const url = new URL(`${process.env.NEXT_PUBLIC_APP_URL}${process.env.NEXT_PUBLIC_API_URL}/exchange?from=`)
		
    const response = await fetch(`${url}${fromCurrency}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.status}`)
    }

    const data: CurrencyData = await response.json()

    if (data.result !== 'success' || !data.conversion_rates) {
      throw new Error('Invalid API response format')
    }

    const rate = data.conversion_rates[toCurrency]

    if (!rate) {
      throw new Error(`Currency ${toCurrency} not found in rates`)
    }

    return rate
  } catch (error) {
    console.error('Exchange rate API error:', error)
    return 1
  }
}