import { getCurrencyLocale } from "@/lib"

export const formatCurrency = (value: number, currency: string = "USD"): string => {
	try {
		const locale = getCurrencyLocale(currency)
		return new Intl.NumberFormat(locale, { style: "currency", currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
	} catch (error) {
		console.warn(`Currency ${currency} not supported, using USD as fallback`)
		return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
	}
}