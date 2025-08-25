"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getSortedRowModel, RowSelectionState, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table';
import { Table, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { AppTableAddition, AppTableBody, AppTableChart, AppTableFilter, AppTableHeader, AppTableMetric, AppTableSelection, AppTableSettings, AppTableToggle } from '@/components/shared/app-table';
import { usePortfoliosContext } from '@/components/shared';
import { getMetrics, getChart } from '@/lib';
import { PortfolioAssetWithRelations } from '@/types/portfolio';

interface Props<TValue> {
	columns: ColumnDef<PortfolioAssetWithRelations, TValue>[];
	className?: string;
}

export const AppTable = <TValue,>({ columns, className }: Props<TValue>) => {

	const { portfolios, createPortfolio, selectPortfolio, selectedPortfolio, editPortfolio, deletePortfolio, isLoading, portfolioAssets, createPortfolioAsset, deletePortfolioAssets, } = usePortfoliosContext()

	const portfolioData = React.useMemo(() => ({
		metrics: getMetrics(portfolioAssets),
		volumeChart: getChart({ data: portfolioAssets, categoryPath: "asset.type", valueKey: "quantity", options: { valueLabel: "Volume" } }),
		priceChart: getChart({ data: portfolioAssets, categoryPath: "asset.type", valueKey: "totalWorth", options: { valueLabel: "Price" } }),
	}), [portfolioAssets])

	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

	const table = useReactTable({
		data: portfolioAssets || [], columns: React.useMemo(() => columns, [columns]),
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting, getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters, getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: { sorting, columnFilters, columnVisibility, rowSelection },
	})

	const [isFirstLoad, setIsFirstLoad] = React.useState<boolean>(true)
	React.useEffect(() => { if (!isLoading && portfolios) { setIsFirstLoad(false) } }, [isLoading, portfolios])

	if (isFirstLoad) {
		return (
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center">
				<p className="font-medium text-4xl 2k:text-6xl 4k:text-8xl 8k:text-[12rem] animate-bounce">A&D</p>
				<p className="font-medium text-3xl 2k:text-4xl 4k:text-6xl 8k:text-[7.5rem] animate-pulse">Steam Portfolio</p>
			</div>
		)
	}

	return (
		<div className={cn("flex flex-col gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8", className)}>

			<div className="flex items-center justify-between flex-wrap gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
				<AppTableSelection portfolios={portfolios} isLoading={isLoading} createPortfolio={createPortfolio} selectedPortfolio={selectedPortfolio} selectPortfolio={selectPortfolio} />
				<div className="flex items-center gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
					<AppTableAddition selectedPortfolio={selectedPortfolio} createPortfolioAsset={createPortfolioAsset} isLoading={isLoading} />
					<AppTableSettings deletePortfolio={deletePortfolio} editPortfolio={editPortfolio} selectedPortfolio={selectedPortfolio} isLoading={isLoading} />
				</div>
			</div>

			<Tabs defaultValue="holdings" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="holdings" disabled={isLoading}>Holdings</TabsTrigger>
					<TabsTrigger value="dashboard" disabled={isLoading}>Dashboard</TabsTrigger>
				</TabsList>
				<TabsContent value="holdings">
					<div className="flex flex-col gap-2 p-2 rounded-md border 2k:p-2.5 4k:p-4 8k:p-8 2k:gap-2.5 4k:gap-4 8k:gap-8">
						<div className="flex justify-between items-center gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
							<AppTableFilter table={table} selectedPortfolio={selectedPortfolio} deletePortfolioAssets={deletePortfolioAssets} />
							<AppTableToggle table={table} />
						</div>
						<div className="flex max-h-[calc(100vh-265px)] overflow-y-auto rounded-md border sm:max-h-[calc(100vh-220px)] 2k:max-h-[calc(100vh-286px)] 4k:max-h-[calc(100vh-438px)] 8k:max-h-[calc(100vh-875px)]">
							<Table>
								<AppTableHeader table={table} className="sticky top-0 z-10 bg-background" />
								<AppTableBody table={table} columns={columns} isLoading={isLoading} />
							</Table>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="dashboard">
					<div className="flex flex-col gap-2 p-2 rounded-md border 2k:p-2.5 4k:p-4 8k:p-8 2k:gap-2.5 4k:gap-4 8k:gap-8">
						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
							{portfolioData.metrics.map((metric) => <AppTableMetric key={metric.key} isLoading={isLoading} metric={metric} />)}
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
							<AppTableChart title="Portfolio Diversification (Volume)" description="Allocation by quantity of items."
								isLoading={isLoading} chartConfig={portfolioData.volumeChart.chartConfig} chartData={portfolioData.volumeChart.chartData} />
							<AppTableChart title="Portfolio Diversification (Price)" description="Allocation by total value of items."
								isLoading={isLoading} chartConfig={portfolioData.priceChart.chartConfig} chartData={portfolioData.priceChart.chartData} />
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}