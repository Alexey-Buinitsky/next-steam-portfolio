export const calculateGainPercentage = (gain: number, invested: number): number => {
	if (invested === 0) return gain * 100
	return (gain / invested) * 100
}