import React from 'react';
import { cn } from '@/lib/utils';
import { BanknoteArrowDownIcon, BanknoteArrowUpIcon } from 'lucide-react';

interface Props {
	className?: string;
}

const items = [
	{
		key: "Total Invested",
		icon: BanknoteArrowDownIcon,
		value: "$45,231.89",
	},
	{
		key: "Total Worth",
		icon: BanknoteArrowUpIcon,
		value: "$45,231.89",
	},
	{
		key: "Gain",
		icon: BanknoteArrowUpIcon,
		value: "$45,231.89",
	},
	{
		key: "Estimated gain after fees",
		icon: BanknoteArrowUpIcon,
		value: "$45,231.89",
	},
]

export const AppTableMetrics: React.FC<Props> = ({ className }) => {
	return (
		<dl className={cn("grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8", className)}>
			{items.map((item) =>
				<div className="grid gap-2 p-6 rounded-md border dark:border-input 2k:gap-2.5 4k:gap-4 8k:gap-8 2k:p-8 4k:p-12 8k:p-24" key={item.key}>
					<dt className="flex items-center justify-between gap-2 tracking-tight font-medium text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl">
						{item.key}
						<span className="flex shrink-0">
							<item.icon size={24} className="2k:size-8 4k:size-11 8k:size-21" />
						</span>
					</dt>
					<dd className="font-bold text-2xl 2k:text-[32px] 4k:text-5xl 8k:text-8xl">
						{item.value}
					</dd>
				</div>
			)}
		</dl>
	)
}