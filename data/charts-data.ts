import { ChartConfig } from "@/components/ui"

export interface IChartData {
	browser: string
	visitors: number
	fill: string
}

export const chartData: IChartData[] = [
	{ browser: "chrome", visitors: 275, fill: "var(--chart-1)" },
	{ browser: "safari", visitors: 200, fill: "var(--chart-2)" },
	{ browser: "firefox", visitors: 187, fill: "var(--chart-3)" },
	{ browser: "edge", visitors: 173, fill: "var(--chart-4)" },
	{ browser: "other", visitors: 90, fill: "var(--chart-5)" },
]

export const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "var(--chart-1)",
	},
	safari: {
		label: "Safari",
		color: "var(--chart-2)",
	},
	firefox: {
		label: "Firefox",
		color: "var(--chart-3)",
	},
	edge: {
		label: "Edge",
		color: "var(--chart-4)",
	},
	other: {
		label: "Other",
		color: "var(--chart-5)",
	},
} satisfies ChartConfig