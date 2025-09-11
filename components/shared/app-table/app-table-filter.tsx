import React from 'react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks';
import { useReactTable } from '@tanstack/react-table';
import { Button, Dialog, DialogTrigger, Input, Label } from '@/components/ui';
import { AppDialog } from '@/components/shared';
import { SearchIcon, TrashIcon } from 'lucide-react';
import { DeletePortfolioAssetsProps } from '@/hooks/use-portfolios';
import { Portfolio } from '@prisma/client';
import { PortfolioAssetWithRelations } from '@/types/portfolio';

interface Props {
	table: ReturnType<typeof useReactTable<PortfolioAssetWithRelations>>,
	selectedPortfolio: Portfolio | undefined;
	deletePortfolioAssets: (params: DeletePortfolioAssetsProps) => void;
	className?: string
}

export const AppTableFilter: React.FC<Props> = ({ table, selectedPortfolio, deletePortfolioAssets, className }) => {

	const [localQuery, setLocalQuery] = React.useState<string>((table.getColumn("name")?.getFilterValue() as string) ?? "")

	const debouncedQuery = useDebounce(localQuery.trim(), 300)

	React.useEffect(() => { table.getColumn("name")?.setFilterValue(debouncedQuery) }, [debouncedQuery, table])

	const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original)

	const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)

	const onCancel = (): void => {
		setIsDialogOpen(false)
	}

	const handleDelete = () => {
		if (!selectedPortfolio || selectedRows.length <= 0) return

		setIsDialogOpen(false)
		deletePortfolioAssets({ portfolioId: selectedPortfolio.id, selectedPortfolioAssets: selectedRows })
		table.resetRowSelection()
	}

	return (
		<div className={cn("flex gap-2 w-full 2k:gap-2.5 4k:gap-4 8k:gap-8", className)}>
			<div className="relative max-w-sm w-full 2k:max-w-lg 4k:max-w-3xl 8k:max-w-[96rem]">
				<Input className="pl-7 2k:pl-9.5 4k:pl-14 8k:pl-28" id="filter" placeholder="Type to filter..." value={localQuery} onChange={(e) => setLocalQuery(e.target.value)} />
				<Label className="sr-only" htmlFor="filter">Type to filter</Label>
				<SearchIcon size={16} className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground select-none pointer-events-none 2k:left-2.5 4k:left-4 8k:left-8 2k:size-5.5 4k:size-8 8k:size-16" />
			</div>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogTrigger asChild>
					<Button variant="outline" size="icon" onClick={() => setIsDialogOpen(true)}
						className={`${table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate") ? 'visible opacity-100' : 'invisible opacity-0'}`}>
						<TrashIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
						<span className="sr-only">Delete</span>
					</Button>
				</DialogTrigger>
				<AppDialog mode="deletePortfolioAssets" selectedPortfolioAssets={selectedRows} onCancel={onCancel} onSubmit={handleDelete} />
			</Dialog>
		</div>
	)
}