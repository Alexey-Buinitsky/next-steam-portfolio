import { formatCurrency, formatPercentage } from "@/lib"

export const formatValue = (value: number, type: 'currency' | 'percentage' = 'currency'): string => {
	const formattedValue = type === 'currency' ? formatCurrency(value) : formatPercentage(value)
	if (value >= 0) return `+${formattedValue}`
	return formattedValue
}