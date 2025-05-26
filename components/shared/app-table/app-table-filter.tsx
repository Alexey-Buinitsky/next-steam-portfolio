import React from 'react';
import { cn } from '@/lib/utils';
import { useReactTable } from '@tanstack/react-table';
import { Input } from '@/components/ui';

export const AppTableFilter = <TData,>({ table, className }: {
	table: ReturnType<typeof useReactTable<TData>>,
	className?: string
}) => {
	return (
		<Input
			placeholder="Filter names..."
			value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
			onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
			className={cn("max-w-sm", className)}
		/>
	);
};