import React from 'react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks';
import { useReactTable } from '@tanstack/react-table';
import { Button, Input, Label } from '@/components/ui';
import { SearchIcon, TrashIcon } from 'lucide-react';

interface Props<TData> {
	table: ReturnType<typeof useReactTable<TData>>,
	className?: string
}

export const AppTableFilter = <TData,>({ table, className }: Props<TData>) => {

	const [localQuery, setLocalQuery] = React.useState<string>((table.getColumn("name")?.getFilterValue() as string) ?? "")

	const debouncedQuery = useDebounce(localQuery, 300)

	React.useEffect(() => {table.getColumn("name")?.setFilterValue(debouncedQuery)}, [debouncedQuery, table])

	return (
		<div className={cn("flex gap-2 w-full 2k:gap-2.5 4k:gap-4 8k:gap-8", className)}>
			<div className="relative max-w-sm w-full 2k:max-w-lg 4k:max-w-3xl 8k:max-w-[96rem]">
				<Input
					id="filter"
					placeholder="Type to filter..."
					value={localQuery}
					onChange={(e) => setLocalQuery(e.target.value)}
					className="pl-7 2k:pl-9.5 4k:pl-14 8k:pl-28"
				/>
				<Label className="sr-only" htmlFor="filter">Type to filter</Label>
				<SearchIcon size={16} className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground select-none pointer-events-none 2k:left-2.5 4k:left-4 8k:left-8 2k:size-5.5 4k:size-8 8k:size-16" />
			</div>
			<Button variant="outline" size="icon" className={`
			${table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
					? 'visible opacity-100' : 'invisible opacity-0'} 2k:size-12 4k:size-18 8k:size-36`}>
				<TrashIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
				<span className="sr-only">Delete</span>
			</Button>
		</div>
	);
};