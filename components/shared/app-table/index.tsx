"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table';
import { Table } from '@/components/ui';
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
		<div className={cn("", className)}>
			<div className="flex justify-between items-center gap-2 p-2">
				<AppTableFilter table={table} />
				<AppTableToggle table={table} />
			</div>

			{/* <div className="rounded-md border flex flex-col max-h-80 overflow-hidden">
				<Table>
					<AppTableHeader table={table} className="sticky top-0 z-10 bg-background" />
					<AppTableBody table={table} columns={columns} />
				</Table>
			</div> */}

			<div className="rounded-md border">
				<Table>
					<AppTableHeader table={table} />
					<AppTableBody table={table} columns={columns} />
				</Table>
			</div>
		</div>
	)
}