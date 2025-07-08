import { ChartConfig } from "@/components/ui";
import { formatAssetType, getNestedValue, NestedObject } from "@/lib/chart";

export interface IChartData {
	category: string;
	value: number;
	fill: string;
}

interface Props<T extends Record<string, unknown>> {
	data: T[] | undefined;
	categoryPath: string;
	valueKey: keyof T;
	options?: { valueLabel?: string; };
}

interface ReturnProps {
	chartData: IChartData[];
	chartConfig: ChartConfig;
}

export const getChart = <T extends Record<string, unknown>>({ data, categoryPath, valueKey, options = {} }: Props<T>): ReturnProps => {

	const valueLabel = options.valueLabel || "Value"

	if (!data || data.length === 0) {
		return { chartData: [], chartConfig: { value: { label: valueLabel } } }
	}

	// Группировка
	const groupedData = data.reduce<Record<string, number>>((acc, item) => {
		const category = formatAssetType(getNestedValue(item as NestedObject, categoryPath))
		const value = Number(item[valueKey]) || 0
		acc[category] = (acc[category] || 0) + value
		return acc
	}, {})

	// Сортировка
	const sortedEntries = Object.entries(groupedData).sort((a, b) => b[1] - a[1])

	// Обработка
	const mainEntries = sortedEntries.slice(0, 4)
	const otherValue = sortedEntries.slice(4).reduce((sum, [, value]) => sum + value, 0)

	// Формирование данных для диаграммы
	const chartData: IChartData[] = mainEntries.map(([category, value], index) => ({ category, value, fill: `var(--chart-${index + 1})` }))
	if (otherValue > 0) { chartData.push({ category: "Other", value: otherValue, fill: `var(--chart-5)` }) }

	// Формирование конфига для диаграммы
	const chartConfig: ChartConfig = {
		value: { label: valueLabel },
		...chartData.reduce((acc, item) => {
			const label = item.category === "other" ? "Other" : item.category.charAt(0).toUpperCase() + item.category.slice(1)

			acc[label] = { label, color: item.fill }
			return acc
		}, {} as Record<string, { label: string; color: string }>)
	}

	return { chartData, chartConfig }
}