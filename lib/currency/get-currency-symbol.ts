import { getCurrencyLocale } from "@/lib"
import { currencySymbols } from "@/data/currency-symbols";

export const getCurrencySymbol = (currency: string = "USD"): string => {

	if (currencySymbols[currency]) {
		return currencySymbols[currency]
	}

	try {
		const locale = getCurrencyLocale(currency)
		const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })
		const parts = formatter.formatToParts(1)
		const currencyPart = parts.find(part => part.type === 'currency')
		return currencyPart?.value || currency
	} catch {
		return currency
	}
}