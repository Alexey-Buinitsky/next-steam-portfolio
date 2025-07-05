"use client"

import React from "react"
import Image from "next/image"
import { Column, ColumnDef, Row } from "@tanstack/react-table"
import { Button, Checkbox, Dialog, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui"
import { AppDialog } from "@/components/shared"
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, EyeOffIcon, MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react"
import { formatCurrency, formatPercentage } from "@/lib"
import { usePortfolios } from "@/hooks"
import { PortfolioAssetWithRelations } from "@/types/portfolio"

const SortableHeader = ({ column, children }: { column: Column<PortfolioAssetWithRelations>, children: React.ReactNode }) => {

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="w-full justify-between">
					{children}
					<ChevronsUpDownIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem onClick={() => column.toggleSorting(column.getFirstSortDir() === "asc")}>
					<ArrowUpIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
					Asc
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => column.toggleSorting(column.getFirstSortDir() === "desc")}>
					<ArrowDownIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
					Desc
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
					<EyeOffIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
					Hide
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const ActionsCell = ({ row }: { row: Row<PortfolioAssetWithRelations> }) => {

	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false)
	const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)
	const [mode, setMode] = React.useState<'edit' | 'delete' | null>(null)

	const { editPortfolioAsset, deletePortfolioAsset } = usePortfolios()

	const onCancel = (): void => {
		setIsDialogOpen(false)
	}

	const handleEdit = (data: { quantity: number; buyPrice: number }): void => {
		if (!row.original || !row.original.portfolioId) return

		editPortfolioAsset({ portfolioId: row.original.portfolioId, selectedPortfolioAsset: row.original, quantity: data.quantity, buyPrice: data.buyPrice })
		setIsDialogOpen(false)
	}

	const handleDelete = (): void => {
		if (!row.original || !row.original.portfolioId) return

		setIsDialogOpen(false)
		deletePortfolioAsset({ portfolioId: row.original.portfolioId, selectedPortfolioAsset: row.original })
	}

	const openEditDialog = () => {
		setMode('edit')
		setIsMenuOpen(false)
		setIsDialogOpen(true)
	}

	const openDeleteDialog = () => {
		setMode('delete')
		setIsMenuOpen(false)
		setIsDialogOpen(true)
	}

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="w-full">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel className="font-semibold">Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DialogTrigger asChild>
						<DropdownMenuItem onClick={openEditDialog}>
							<PencilIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
							Edit
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogTrigger asChild>
						<DropdownMenuItem onClick={openDeleteDialog}>
							<TrashIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
							Delete
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			{mode === 'edit'
				? <AppDialog mode="editPortfolioAsset" selectedPortfolioAsset={row.original} onCancel={onCancel} onSubmit={handleEdit} />
				: <AppDialog mode="deletePortfolioAsset" selectedPortfolioAsset={row.original} onCancel={onCancel} onSubmit={handleDelete} />}
		</Dialog>
	)
}

export const columns: ColumnDef<PortfolioAssetWithRelations>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox aria-label="Select all"
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} />
		),
		cell: ({ row }) => (
			<Checkbox aria-label="Select row" checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "icon",
		header: "Icon",
		cell: ({ row }) => <Image alt={row.original.asset.name} src={`https://steamcommunity-a.akamaihd.net/economy/image/${row.original.asset.imageUrl || ""}`} priority={true} width={40} height={40} className="2k:size-13 4k:size-20 8k:size-40" />,
	},
	{
		accessorKey: "name",
		header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
		cell: ({ row }) => row.original.asset.name,
	},
	{
		accessorKey: "quantity",
		header: ({ column }) => <SortableHeader column={column}>Quantity</SortableHeader>,
		cell: ({ row }) => row.original.quantity,
	},
	{
		accessorKey: "buyPrice",
		header: ({ column }) => <SortableHeader column={column}>Buy price</SortableHeader>,
		cell: ({ row }) => formatCurrency(row.getValue("buyPrice")),
	},
	{
		accessorKey: "currentPrice",
		header: ({ column }) => <SortableHeader column={column}>Current price</SortableHeader>,
		cell: ({ row }) => formatCurrency(row.original.asset.price ? row.original.asset.price / 100 : row.getValue("buyPrice")),
	},
	{
		accessorKey: "totalInvested",
		header: ({ column }) => <SortableHeader column={column}>Total invested</SortableHeader>,
		cell: ({ row }) => formatCurrency(row.getValue("totalInvested")),
	},
	{
		accessorKey: "totalWorth",
		header: ({ column }) => <SortableHeader column={column}>Total worth</SortableHeader>,
		cell: ({ row }) => formatCurrency(row.getValue("totalWorth")),
	},
	{
		accessorKey: "percentage",
		header: ({ column }) => <SortableHeader column={column}>%</SortableHeader>,
		cell: ({ row }) => formatPercentage(row.getValue("percentage")),
	},
	{
		accessorKey: "gain",
		header: ({ column }) => <SortableHeader column={column}>Gain</SortableHeader>,
		cell: ({ row }) => formatCurrency(row.getValue("gain")),
	},
	{
		accessorKey: "gainAfterFees",
		header: ({ column }) => <SortableHeader column={column}>Gain after fees</SortableHeader>,
		cell: ({ row }) => formatCurrency(row.getValue("gainAfterFees")),
	},
	{
		id: "actions",
		cell: ({ row }) => <ActionsCell row={row} />,
	},
]