export const formatValueColor = (value: number): string => {
	if (value >= 0) return "text-green-600 dark:text-green-400"
	if (value < 0) return "text-red-600 dark:text-red-400"
	return ""
}