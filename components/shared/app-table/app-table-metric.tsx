import React from 'react';
import { cn } from '@/lib/utils';
import { Badge, Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { IMetric } from '@/lib';

interface Props {
	className?: string;
	metric: IMetric;
}

export const AppTableMetric: React.FC<Props> = ({ className, metric }) => {
	return (
		<Card className={cn("", className)}>
			<CardHeader className="h-full">
				<CardDescription>{metric.key}</CardDescription>
				<CardTitle className="mt-auto font-bold text-2xl 2k:text-[32px] 4k:text-5xl 8k:text-8xl">{metric.value}</CardTitle>
				<CardAction>
					<Badge variant={'outline'}>
						{metric.icon && <metric.icon size={24} className="2k:size-8 4k:size-11 8k:size-21" />}
					</Badge>
				</CardAction>
			</CardHeader>
		</Card>
	)
}