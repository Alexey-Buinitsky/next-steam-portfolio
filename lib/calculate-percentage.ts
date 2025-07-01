export const calculatePercentage = (current: number, buy: number): number => {
	return ((current - buy) / buy) * 100
}