import { getCurrencyLocale } from "@/lib"
import { currencySymbols } from "@/data/currency-symbols";

export const formatCurrency = (value: number, currency: string = "USD"): string => {
	try {
		const locale = getCurrencyLocale(currency)
		const formatter = new Intl.NumberFormat(locale, { style: "currency", currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 })

		let formatted = formatter.format(value)

		if (currencySymbols[currency]) {
			const tempFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })
			const parts = tempFormatter.formatToParts(1)
			const currentSymbol = parts.find(part => part.type === 'currency')?.value || currency

			if (currentSymbol !== currencySymbols[currency]) {
				const escapedSymbol = currentSymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
				formatted = formatted.replace(new RegExp(escapedSymbol, 'g'), currencySymbols[currency])
			}
		}

		return formatted
	} catch (error) {
		console.error('[CURRENCY_FORMAT] Error:', error)
		return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
	}
}