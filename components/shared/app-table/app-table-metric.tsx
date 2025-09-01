import React from 'react';
import { cn } from '@/lib/utils';
import { Badge, Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { MetricSkeleton } from '@/components/shared';
import { formatValue, getValueColor, IMetric } from '@/lib';

interface Props {
	className?: string;
	isLoading: boolean;
	metric: IMetric;
}

export const AppTableMetric: React.FC<Props> = ({ className, isLoading, metric }) => {
	return (
		<Card className={cn("", className)}>
			{isLoading
				? <MetricSkeleton />
				: <CardHeader className="relative">
					<CardDescription>{metric.key}</CardDescription>
					<CardTitle className="font-bold text-2xl 2k:text-[32px] 4k:text-5xl 8k:text-8xl">{metric.value}</CardTitle>
					{metric.percentage !== undefined &&
						<CardAction className="absolute top-[-22px] right-1 2xl:top-[-20px] 2xl:right-1.5 full-hd:top-[-12px] full-hd:right-3 2k:top-[-16px] 2k:right-4 4k:top-[-24px] 4k:right-6 8k:top-[-48px] 8k:right-12">
							<Badge variant={'outline'}>
								<span className={cn("font-medium 2k:text-base 4k:text-2xl 8k:text-5xl", getValueColor(metric.percentage))}>
									{formatValue(metric.percentage, "percentage")}
								</span>
							</Badge>
						</CardAction>
					}
				</CardHeader>
			}
		</Card>
	)
}