"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getSortedRowModel, RowSelectionState, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table';
import { Table } from '@/components/ui';
import { AppTableAddition, AppTableBody, AppTableChart, AppTableFilter, AppTableHeader, AppTableMetric, AppTableSelection, AppTableSettings, AppTableToggle } from './index';

import { usePortfolios } from '@/hooks';

import { metricsData } from '@/data/metrics-data';
import { chartConfig, chartData } from '@/data/charts-data';

interface Props<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	className?: string;
}

export const AppTable = <TData, TValue>({ columns, data, className }: Props<TData, TValue>) => {

	const portfolios = usePortfolios()

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
					portfolios={portfolios.portfolios} isLoading={portfolios.isLoading} createPortfolio={portfolios.createPortfolio}
					selectedPortfolio={portfolios.selectedPortfolio} selectPortfolio={portfolios.selectPortfolio} />
				<div className="flex items-center gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
					<AppTableAddition selectedPortfolio={portfolios.selectedPortfolio} isLoading={portfolios.isLoading} />
					<AppTableSettings deletePortfolio={portfolios.deletePortfolio} editPortfolio={portfolios.editPortfolio}
						selectedPortfolio={portfolios.selectedPortfolio} isLoading={portfolios.isLoading} />
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