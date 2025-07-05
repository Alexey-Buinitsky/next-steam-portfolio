import React from 'react';
import { cn } from '@/lib/utils';
import { ColumnDef, flexRender, useReactTable } from '@tanstack/react-table';
import { TableBody, TableCell, TableRow } from '@/components/ui';
import { Loader2Icon } from 'lucide-react';
import { PortfolioAssetWithRelations } from '@/types/portfolio';

interface Props<TValue> {
	table: ReturnType<typeof useReactTable<PortfolioAssetWithRelations>>,
	columns: ColumnDef<PortfolioAssetWithRelations, TValue>[],
	className?: string,
	isLoading: boolean,
}

export const AppTableBody = <TValue,>({ table, columns, isLoading, className }: Props<TValue>) => {

	const rows = table.getRowModel().rows

	return (
		<TableBody className={cn('', className)}>
			{isLoading
				? <TableRow>
					<TableCell colSpan={columns.length} className="h-24 text-center">
						<div className="flex items-center justify-center gap-2">
							<Loader2Icon size={24} className="2k:size-8 4k:size-11 8k:size-21 animate-spin" />
						</div>
					</TableCell>
				</TableRow>
				: rows.length > 0
					? rows.map((row) => (
						<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
							))}
						</TableRow>
					))
					: <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell></TableRow>
			}
		</TableBody>
	)
}