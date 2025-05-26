export const calculatePercentage = (current: number, buy: number): string => {
	return `${(((current - buy) / buy) * 100).toFixed(2)}%`
}