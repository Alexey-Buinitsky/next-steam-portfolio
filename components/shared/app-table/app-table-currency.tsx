import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Popover, PopoverContent, PopoverTrigger, } from '@/components/ui';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { getCurrencySymbol } from '@/lib';
import { popularCurrencies } from '@/data/currencies';
import { Portfolio } from '@prisma/client';

interface Props {
	className?: string;
	selectedPortfolio: Portfolio | undefined;
	changePortfolioCurrency: ({ id, currency }: { id: number; currency: string; }) => void;
	isLoading: boolean;
}

export const AppTableCurrency: React.FC<Props> = ({ className, selectedPortfolio, changePortfolioCurrency, isLoading }) => {

	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false)

	const displayedCurrency = selectedPortfolio?.currency || "USD"

	const onSelect = (currency: string): void => {
		if (!selectedPortfolio) return

		setIsMenuOpen(false)
		changePortfolioCurrency({ id: selectedPortfolio.id, currency })
	}

	return (
		<Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline" role="combobox" disabled={isLoading || !selectedPortfolio}
					className="w-[9rem] justify-between 2k:w-[12rem] 4k:w-[19rem] 8k:w-[38rem] 2k:text-lg 4k:text-3xl 8k:text-6xl">
					{displayedCurrency} - {getCurrencySymbol(displayedCurrency)}
					<ChevronsUpDownIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[9rem] 2k:w-[12rem] 4k:w-[19rem] 8k:w-[38rem]">
				<Command className={cn("", className)}>
					<CommandInput placeholder="Type to search..." />
					<CommandList>
						<CommandGroup>
							{popularCurrencies.map((currency) => (
								<CommandItem className="justify-between" key={currency} value={currency} onSelect={() => onSelect(currency)}>
									{currency} - {getCurrencySymbol(currency)}
									{currency === displayedCurrency && <CheckIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />}
								</CommandItem>
							))}
						</CommandGroup>
						<CommandEmpty>No currencies found</CommandEmpty>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}