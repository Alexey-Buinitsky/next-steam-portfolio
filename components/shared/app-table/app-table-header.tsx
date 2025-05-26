import React from 'react';
import { cn } from '@/lib/utils';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from '@/components/ui';

export const AppTableHeader = <TData,>({ table, className }: {
	table: ReturnType<typeof useReactTable<TData>>,
	className?: string
}) => {
	return (
		<TableHeader className={cn("", className)}>
			{table.getHeaderGroups().map((headerGroup) => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<TableHead key={header.id}>
							{!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
						</TableHead>
					))}
				</TableRow>
			))}
		</TableHeader>
	)
}