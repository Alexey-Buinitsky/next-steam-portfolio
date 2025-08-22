"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "@/components/ui"
import { ChartSkeleton, } from "@/components/shared"
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
				? <ChartSkeleton />
				: <>
					<CardHeader>
						<CardTitle className="text-lg 2k:text-2xl 4k:text-4xl 8k:text-7xl">{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="mx-auto aspect-square xl:max-h-[calc(100vh-445px)] 2xl:max-h-[calc(100vh-425px)] 2k:max-h-[calc(100vh-555px)] 4k:max-h-[calc(100vh-810px)] 8k:max-h-[calc(100vh-1580px)]">
							<PieChart accessibilityLayer>
								<ChartTooltip content={<ChartTooltipContent />} />
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
		</Card>
	)
}