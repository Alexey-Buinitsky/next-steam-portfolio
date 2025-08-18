import React from 'react';
import { Skeleton } from '@/components/ui';

export const MetricSkeleton: React.FC = () => {
	return (
		<div className="flex space-x-2 2k:space-x-2.5 4k:space-x-4 8k:space-x-8 px-6 2k:px-8 4k:px-12 8k:px-24">
			<div className="flex-1 space-y-2 2k:space-y-2.5 4k:space-y-4 8k:space-y-8">
				<Skeleton className="h-5 2k:h-7 4k:h-9 8k:h-15" />
				<Skeleton className="h-8 2k:h-10.5 4k:h-12 8k:h-24" />
			</div>
			<Skeleton className="h-7.5 2k:h-10 4k:h-13.5 8k:h-26.5 w-10.5 2k:w-13.5 4k:w-19.5 8k:w-38.5 " />
		</div>
	)
}