import React from 'react';
import { Skeleton } from '@/components/ui';

export const ChartSkeleton: React.FC = () => {
	return (
		<div className="flex flex-col space-y-24 4k:space-y-40 8k:space-y-84 px-6 2k:px-8 4k:px-12 8k:px-24">
			<div className="flex-1 space-y-2 2k:space-y-2.5 4k:space-y-4 8k:space-y-8">
				<Skeleton className="w-full xl:w-3/4 full-hd:w-2/4 h-7 2k:h-8 4k:h-10 8k:h-18" />
				<Skeleton className="w-full xl:w-2/4 full-hd:w-1/4 h-5 2k:h-7 4k:h-9 8k:h-15" />
			</div>
			<div className="flex flex-1 flex-col items-center space-y-20 4k:space-y-32 8k:space-y-64 aspect-square xl:max-h-[calc(100vh-495px)] 2k:max-h-[calc(100vh-625px)] 4k:max-h-[calc(100vh-920px)] 8k:max-h-[calc(100vh-1820px)]">
				<Skeleton className="rounded-full aspect-square h-full" />
				<div className="flex flex-wrap justify-center gap-2 w-full 2k:gap-2.5 4k:gap-4 8k:gap-6">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="flex items-center justify-center basis-1/4 space-x-2 2k:space-x-2.5 4k:space-x-4 8k:space-x-8">
							<Skeleton className="rounded-full h-4 w-4 2k:h-5 2k:w-5 4k:h-8 4k:w-8 8k:h-16 8k:w-16" />
							<Skeleton className="h-4 w-16 2k:h-5 2k:w-20 4k:h-8 4k:w-32 8k:h-16 8k:w-64" />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}