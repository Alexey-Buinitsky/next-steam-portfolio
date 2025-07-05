import React from 'react';
import { cn } from '@/lib/utils';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from '@/components/ui';
import { PortfolioAssetWithRelations } from '@/types/portfolio';

interface Props {
	table: ReturnType<typeof useReactTable<PortfolioAssetWithRelations>>,
	className?: string
}

export const AppTableHeader = ({ table, className }: Props) => {
	return (
		<TableHeader className={cn("relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-border", className)}>
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