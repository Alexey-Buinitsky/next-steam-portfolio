import React from 'react';
import { cn } from '@/lib/utils';
import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "@/components/ui"

import { IChartData } from '@/data/charts-data';

interface Props {
	className?: string
	title: string
	description: string
	chartConfig: ChartConfig
	chartData: IChartData[]
}

export const AppTableChart: React.FC<Props> = ({ className, title, description, chartConfig, chartData }) => {
	return (
		<Card className={cn("", className)}>
			<CardHeader>
				<CardTitle className="text-lg 2k:text-2xl 4k:text-4xl 8k:text-7xl">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[215px]">
					<PieChart accessibilityLayer>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Pie data={chartData} dataKey="visitors" nameKey="browser" stroke="0" />
						<ChartLegend
							content={<ChartLegendContent nameKey="browser" />}
							className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}