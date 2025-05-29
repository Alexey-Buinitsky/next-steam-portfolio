import React from 'react';
import { cn } from '@/lib/utils';
import { useReactTable } from '@tanstack/react-table';
import { Button, Input } from '@/components/ui';
import { TrashIcon } from 'lucide-react';

interface Props<TData> {
	table: ReturnType<typeof useReactTable<TData>>,
	className?: string
}

export const AppTableFilter = <TData,>({ table, className }: Props<TData>) => {
	return (
		<div className={cn("flex gap-2 w-full 2k:gap-2.5 4k:gap-4 8k:gap-8", className)}>
			<Input
				placeholder="Filter names..."
				value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
				onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
				className="max-w-sm"
			/>
			<Button variant="outline" size="icon" className={`
			${table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
					? 'visible opacity-100' : 'invisible opacity-0'} 2k:size-12 4k:size-18 8k:size-36`}>
				<TrashIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
				<span className="sr-only">Delete</span>
			</Button>
		</div>
	);
};