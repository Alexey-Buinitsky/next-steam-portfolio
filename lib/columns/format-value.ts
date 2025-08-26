import { formatCurrency, formatPercentage } from "@/lib"

export const formatValue = (value: number, type: 'currency' | 'percentage' = 'currency', currency: string = 'USD'): string => {
	const formattedValue = type === 'currency' ? formatCurrency(value, currency) : formatPercentage(value)
	if (value >= 0) return `+${formattedValue}`
	return formattedValue
}