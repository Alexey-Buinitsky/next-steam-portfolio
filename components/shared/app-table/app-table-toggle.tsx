import React from 'react';
import { useReactTable } from '@tanstack/react-table';
import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui';
import { Settings2Icon } from 'lucide-react';
import { PortfolioAssetWithRelations } from '@/types/portfolio';

interface Props {
	table: ReturnType<typeof useReactTable<PortfolioAssetWithRelations>>
}

export const AppTableToggle = ({ table }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="2k:text-lg 4k:text-3xl 8k:text-6xl">
					<Settings2Icon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
					View
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel className="font-semibold">
					Toggle columns
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
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