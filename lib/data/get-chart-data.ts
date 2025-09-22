import { ChartConfig } from "@/components/ui";
import { formatAssetType } from "@/lib";
import { PortfolioAssetWithRelations } from "@/types/portfolio";

export interface IChartData {
	category: string;
	value: number;
	fill: string;
}

interface Props {
	data: PortfolioAssetWithRelations[] | undefined;
	valueKey: keyof PortfolioAssetWithRelations;
	options?: { valueLabel?: string; };
}

interface ReturnProps {
	chartData: IChartData[];
	chartConfig: ChartConfig;
}

export const getChartData = ({ data, valueKey, options = {} }: Props): ReturnProps => {

	const valueLabel = options.valueLabel || "Value"

	if (!data || data.length === 0) {
		return {
			chartData: [{ category: "No data", value: 100, fill: "var(--muted)" }],
			chartConfig: { value: { label: valueLabel }, "No data": { label: "No data", color: "var(--muted)" } }
		}
	}

	const groupedData = data.reduce<Record<string, number>>((acc, item) => {
		const category = formatAssetType(item.asset)
		const value = Number(item[valueKey]) || 0
		acc[category] = (acc[category] || 0) + value
		return acc
	}, {})

	const sortedEntries = Object.entries(groupedData).sort((a, b) => b[1] - a[1])

	const mainEntries = sortedEntries.slice(0, 4)
	const otherValue = sortedEntries.slice(4).reduce((sum, [, value]) => sum + value, 0)

	const totalValue = sortedEntries.reduce((sum, [, value]) => sum + value, 0)

	const chartData: IChartData[] = mainEntries.map(([category, value], index) => ({ category, value: totalValue > 0 ? (value / totalValue) * 100 : 0, fill: `var(--chart-${index + 1})`, }))
	if (otherValue > 0) { chartData.push({ category: "Other", value: totalValue > 0 ? (otherValue / totalValue) * 100 : 0, fill: `var(--chart-5)`, }) }

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