export const calculatePercentage = (current: number, buy: number): number => {
	if (buy === 0) return current * 100
	return ((current - buy) / buy) * 100
}