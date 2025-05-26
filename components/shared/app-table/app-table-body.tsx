import React from 'react';
import { cn } from '@/lib/utils';
import { ColumnDef, flexRender, useReactTable } from '@tanstack/react-table';
import { TableBody, TableCell, TableRow } from '@/components/ui';

export const AppTableBody = <TData, TValue>({ table, columns, className }: {
	table: ReturnType<typeof useReactTable<TData>>,
	columns: ColumnDef<TData, TValue>[],
	className?: string,
}) => {
	return (
		<TableBody className={cn("", className)}>
			{table.getRowModel().rows?.length
				? table.getRowModel().rows.map((row) => (
					<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
						{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				))
				: <TableRow>
					<TableCell colSpan={columns.length} className="h-24 text-center">
						No results.
					</TableCell>
				</TableRow>
			}
		</TableBody>
	)
}