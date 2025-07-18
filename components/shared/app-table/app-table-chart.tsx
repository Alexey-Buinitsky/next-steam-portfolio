"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "@/components/ui"
import { Loader2Icon } from 'lucide-react';
import { IChartData } from '@/lib';

interface Props {
	className?: string;
	isLoading: boolean;
	title: string;
	description: string;
	chartConfig: ChartConfig;
	chartData: IChartData[];
}

export const AppTableChart: React.FC<Props> = ({ className, isLoading, title, description, chartConfig, chartData }) => {
	return (
		<Card className={cn("", className)}>
			{isLoading
				? <div className="flex items-center justify-center gap-2">
					<Loader2Icon size={24} className="2k:size-8 4k:size-11 8k:size-21 animate-spin" />
				</div>
				: <>
					<CardHeader>
						<CardTitle className="text-lg 2k:text-2xl 4k:text-4xl 8k:text-7xl">{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-54 2k:max-h-71.5 4k:max-h-108 8k:max-h-216">
							<PieChart accessibilityLayer>
								<ChartTooltip content={<ChartTooltipContent hideLabel />} />
								<Pie data={chartData} dataKey="value" nameKey="category" stroke="0" />
								<ChartLegend
									content={<ChartLegendContent nameKey="category" />}
									className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center 2k:gap-2.5 4k:gap-4 8k:gap-8 2k:pt-4 4k:pt-6 8k:pt-12"
								/>
							</PieChart>
						</ChartContainer>
					</CardContent>
				</>
			}
			{/* <CardHeader>
				<CardTitle className="text-lg 2k:text-2xl 4k:text-4xl 8k:text-7xl">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-54 2k:max-h-71.5 4k:max-h-108 8k:max-h-216">
					<PieChart accessibilityLayer>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Pie data={chartData} dataKey="value" nameKey="category" stroke="0" />
						<ChartLegend
							content={<ChartLegendContent nameKey="category" />}
							className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center 2k:gap-2.5 4k:gap-4 8k:gap-8 2k:pt-4 4k:pt-6 8k:pt-12"
						/>
					</PieChart>
				</ChartContainer>
			</CardContent> */}
		</Card>
	)
}