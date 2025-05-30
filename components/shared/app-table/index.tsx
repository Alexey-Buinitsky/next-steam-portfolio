"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table';
import { Table } from '@/components/ui';
import { AppTableSelection } from './app-table-selection';
import { AppTableAddition } from './app-table-addition';
import { AppTableSettings } from './app-table-settings';
import { AppTableMetrics } from './app-table-metrics';
import { AppTableFilter } from './app-table-filter';
import { AppTableToggle } from './app-table-toggle';
import { AppTableHeader } from './app-table-header';
import { AppTableBody } from './app-table-body';

interface Props<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	className?: string;
}

export const AppTable = <TData, TValue>({ columns, data, className }: Props<TData, TValue>) => {

	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: { sorting, columnFilters, columnVisibility, rowSelection },
	})

	return (
		<div className={cn("flex flex-col gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8", className)}>

			<div className="flex items-center justify-between gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
				<AppTableSelection />
				<div className="flex items-center gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
					<AppTableAddition />
					<AppTableSettings />
				</div>
			</div>

			<AppTableMetrics />

			<div className="flex flex-col gap-2 p-2 rounded-md border dark:border-input 2k:p-2.5 4k:p-4 8k:p-8 2k:gap-2.5 4k:gap-4 8k:gap-8">
				<div className="flex justify-between items-center gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
					<AppTableFilter table={table} />
					<AppTableToggle table={table} />
				</div>

				<div className="flex max-h-80 overflow-y-auto rounded-md border">
					<Table>
						<AppTableHeader table={table} className="sticky top-0 z-10 bg-background" />
						<AppTableBody table={table} columns={columns} />
					</Table>
				</div>
			</div>
		</div>
	)
}