import { getCurrencyLocale } from "@/lib"

export const formatCurrency = (value: number, currency: string = "USD"): string => {
	try {
		const locale = getCurrencyLocale(currency)
		return new Intl.NumberFormat(locale, { style: "currency", currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
	} catch (error) {
		console.error('[CURRENCY_API] Request failed:', error)
		return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
	}
}