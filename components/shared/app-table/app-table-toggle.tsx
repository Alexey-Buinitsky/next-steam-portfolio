import React from 'react';
import { useReactTable } from '@tanstack/react-table';
import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui';

export const AppTableToggle = <TData,>({ table }: { table: ReturnType<typeof useReactTable<TData>> }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Columns</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{table.getAllColumns()
					.filter(column => column.getCanHide())
					.map(column => (
						<DropdownMenuCheckboxItem
							key={column.id}
							className="capitalize"
							checked={column.getIsVisible()}
							onCheckedChange={(value) => column.toggleVisibility(!!value)}
						>
							{column.id}
						</DropdownMenuCheckboxItem>
					))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}