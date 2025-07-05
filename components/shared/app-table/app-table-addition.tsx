import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AppDialog } from '@/components/shared';
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Dialog, DialogTrigger, Popover, PopoverContent, PopoverTrigger, } from '@/components/ui';
import { ChevronsUpDownIcon, Loader2Icon } from 'lucide-react';
import { useInView } from "react-intersection-observer";
import { useDebounce, usePortfolios, useSearchAssets } from '@/hooks';
import { Asset, Portfolio } from '@prisma/client';

interface Props {
	className?: string;
	selectedPortfolio: Portfolio | undefined;
	isLoading: boolean;
}

export const AppTableAddition: React.FC<Props> = ({ className, selectedPortfolio, isLoading }) => {

	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false)
	const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)

	const [localQuery, setLocalQuery] = React.useState<string>("")
	const debouncedQuery = useDebounce(localQuery.trim(), 300)

	const { assets, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchAssets(debouncedQuery)

	const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(null)

	const { createPortfolioAsset } = usePortfolios()

	// Добавляем Intersection Observer
	const { ref, inView } = useInView()

	// Эффект для подгрузки при появлении триггера
	React.useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage && !isFetching) { fetchNextPage() }
	}, [inView, hasNextPage, isFetchingNextPage, isFetching, fetchNextPage])

	const onCancel = (): void => {
		setIsDialogOpen(false)
	}

	const onSubmit = (data: { quantity: number; buyPrice: number }): void => {
		if (!selectedPortfolio || !selectedAsset) return

		createPortfolioAsset({ portfolioId: selectedPortfolio.id, selectedAsset, quantity: data.quantity, buyPrice: data.buyPrice })
		setIsDialogOpen(false)
	}

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline" role="combobox" aria-expanded={isMenuOpen} disabled={isLoading || !selectedPortfolio}
						className="w-[16.25rem] justify-between 2k:w-[22rem] 4k:w-[32.5rem] 8k:w-[65rem] 2k:text-lg 4k:text-3xl 8k:text-6xl">
						Add asset
						<ChevronsUpDownIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[16.25rem] 2k:w-[22rem] 4k:w-[32.5rem] 8k:w-[65rem]">
					<Command className={cn("", className)} shouldFilter={false}>
						<CommandInput placeholder="Type to search..." value={localQuery} onValueChange={setLocalQuery} />
						<CommandList>
							{isFetching && !isFetchingNextPage
								? <div className="flex justify-center py-6"><Loader2Icon size={24} className="2k:size-8 4k:size-11 8k:size-21 animate-spin" /></div>
								: assets.length > 0
									? <CommandGroup>
										{assets.map((asset) => (
											<DialogTrigger asChild key={asset.id}>
												<CommandItem onSelect={() => { setIsMenuOpen(false); setIsDialogOpen(true); setSelectedAsset(asset) }}>
													<Image alt={asset.name} src={`https://steamcommunity-a.akamaihd.net/economy/image/${asset.imageUrl || ""}`} priority={true} width={48} height={48} className="2k:size-13 4k:size-20 8k:size-40" />
													{asset.name}
												</CommandItem>
											</DialogTrigger>
										))}
										{hasNextPage &&
											<CommandItem ref={ref} className="justify-center pointer-events-none">
												{isFetchingNextPage ? <Loader2Icon size={24} className="2k:size-8 4k:size-11 8k:size-21 animate-spin" /> : 'Load more'}
											</CommandItem>
										}
									</CommandGroup>
									: <CommandEmpty>No items found</CommandEmpty>
							}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<AppDialog mode="createPortfolioAsset" selectedAsset={selectedAsset} onCancel={onCancel} onSubmit={onSubmit} />
		</Dialog>
	)
}