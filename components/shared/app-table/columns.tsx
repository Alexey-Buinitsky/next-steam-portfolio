"use client"

import Image from "next/image"
import { formatCurrency, calculatePercentage, calculateFee } from "@/lib"
import { Column, ColumnDef } from "@tanstack/react-table"
import { Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui"
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, EyeOffIcon, MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react"

import { IRow } from "@/types/portfolio"

const SortableHeader = ({ column, children }: { column: Column<IRow>, children: React.ReactNode }) => (
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

export const columns: ColumnDef<IRow>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "icon",
		header: "Icon",
		cell: ({ row }) => <Image alt={row.original.name} src={typeof row.original.icon === 'string' ? row.original.icon : row.original.icon.src}  priority={true} width={40} height={40} className="2k:size-13 4k:size-20 8k:size-40" />,
	},
	{
		accessorKey: "name",
		header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
	},
	{
		accessorKey: "quantity",
		header: ({ column }) => <SortableHeader column={column}>Quantity</SortableHeader>,
	},
	{
		accessorKey: "buyPrice",
		header: ({ column }) => <SortableHeader column={column}>Buy price</SortableHeader>,
		cell: ({ row }) => formatCurrency(parseFloat(row.getValue("buyPrice"))),
	},
	{
		accessorKey: "currentPrice",
		header: ({ column }) => <SortableHeader column={column}>Current price</SortableHeader>,
		cell: ({ row }) => formatCurrency(parseFloat(row.getValue("currentPrice"))),
	},
	{
		accessorKey: "totalInvested",
		header: ({ column }) => <SortableHeader column={column}>Total invested</SortableHeader>,
		cell: ({ row }) => {
			const total = parseFloat(row.getValue("quantity")) * parseFloat(row.getValue("buyPrice"))
			return formatCurrency(total)
		},
	},
	{
		accessorKey: "totalWorth",
		header: ({ column }) => <SortableHeader column={column}>Total worth</SortableHeader>,
		cell: ({ row }) => {
			const total = parseFloat(row.getValue("quantity")) * parseFloat(row.getValue("currentPrice"))
			return formatCurrency(total)
		},
	},
	{
		accessorKey: "percentage",
		header: ({ column }) => <SortableHeader column={column}>%</SortableHeader>,
		cell: ({ row }) => {
			const currentPrice = parseFloat(row.getValue("currentPrice"))
			const buyPrice = parseFloat(row.getValue("buyPrice"))
			return calculatePercentage(currentPrice, buyPrice)
		},
	},
	{
		accessorKey: "gain",
		header: ({ column }) => <SortableHeader column={column}>Gain</SortableHeader>,
		cell: ({ row }) => {
			const quantity = parseFloat(row.getValue("quantity"))
			const buyPrice = parseFloat(row.getValue("buyPrice"))
			const currentPrice = parseFloat(row.getValue("currentPrice"))
			return formatCurrency((currentPrice - buyPrice) * quantity)
		},
	},
	{
		accessorKey: "gainAfterFees",
		header: ({ column }) => <SortableHeader column={column}>Gain after fees</SortableHeader>,
		cell: ({ row }) => {
			const quantity = parseFloat(row.getValue("quantity"))
			const buyPrice = parseFloat(row.getValue("buyPrice"))
			const currentPrice = parseFloat(row.getValue("currentPrice"))

			const totalInvested = buyPrice * quantity
			const totalWorth = currentPrice * quantity
			const gain = totalWorth - totalInvested

			const fee5Percent = calculateFee(totalWorth, 23)
			const fee10Percent = calculateFee(totalWorth, 11.5)

			return formatCurrency(gain - fee5Percent - fee10Percent)
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="w-full">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel className="font-semibold">Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
							<PencilIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
							<TrashIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]