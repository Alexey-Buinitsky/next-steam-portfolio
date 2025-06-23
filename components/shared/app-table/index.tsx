"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getSortedRowModel, RowSelectionState, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table';
import { Table } from '@/components/ui';
import { AppTableSelection } from './app-table-selection';
import { AppTableAddition } from './app-table-addition';
import { AppTableSettings } from './app-table-settings';
import { AppTableMetric } from './app-table-metric';
import { AppTableFilter } from './app-table-filter';
import { AppTableToggle } from './app-table-toggle';
import { AppTableHeader } from './app-table-header';
import { AppTableBody } from './app-table-body';
import { AppTableChart } from './app-table-chart';

import { useFetchPortfolios, useSelectPortfolio } from '@/hooks/use-portfolios';

import { metricsData } from '@/data/metrics-data';
import { chartConfig, chartData } from '@/data/charts-data';

interface Props<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	className?: string;
}

export const AppTable = <TData, TValue>({ columns, data, className }: Props<TData, TValue>) => {

	const { portfolios, isFetching, fetchError } = useFetchPortfolios()
	const { selectedPortfolio, isSelecting, selectError, selectPortfolio } = useSelectPortfolio({ portfolios })

	const error = fetchError || selectError
	const isLoading = isFetching || isSelecting
	console.log(error)

	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

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

			<div className="flex items-center justify-between flex-wrap gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
				<AppTableSelection
					portfolios={portfolios} isLoading={isLoading}
					selectedPortfolio={selectedPortfolio} selectPortfolio={selectPortfolio} />
				<div className="flex items-center gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
					<AppTableAddition />
					<AppTableSettings selectedPortfolio={selectedPortfolio} isLoading={isLoading} />
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
				{metricsData.map((metric) => <AppTableMetric key={metric.key} metric={metric} />)}
			</div>

			<div className="flex flex-col gap-2 p-2 rounded-md border 2k:p-2.5 4k:p-4 8k:p-8 2k:gap-2.5 4k:gap-4 8k:gap-8">
				<div className="flex justify-between items-center gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
					<AppTableFilter table={table} />
					<AppTableToggle table={table} />
				</div>

				<div className="flex max-h-90 overflow-y-auto rounded-md border md:max-h-115 xl:max-h-140 full-hd:max-h-165 2k:max-h-220 4k:max-h-330 8k:max-h-660">
					<Table>
						<AppTableHeader table={table} className="sticky top-0 z-10 bg-background" />
						<AppTableBody table={table} columns={columns} />
					</Table>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
				<AppTableChart
					title="Portfolio Diversification (Volume)"
					description="Allocation by quantity of items."
					chartConfig={chartConfig} chartData={chartData} />
				<AppTableChart
					title="Portfolio Diversification (Price)"
					description="Allocation by total value of items."
					chartConfig={chartConfig} chartData={chartData} />
			</div>

		</div>
	)
}