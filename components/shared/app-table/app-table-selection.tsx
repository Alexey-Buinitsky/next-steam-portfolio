import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Dialog, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui';
import { AppTableDialog } from './app-table-dialog';
import { CheckIcon, ListIcon, Loader2Icon } from 'lucide-react';
import { useCreatePortfolio } from '@/hooks/use-portfolios/use-create-portfolio';
import { Portfolio } from '@prisma/client';

interface Props {
	className?: string;
	portfolios: Portfolio[] | undefined;
	selectedPortfolio: Portfolio | undefined;
	selectPortfolio: (newPortfolio: Portfolio) => void;
	isLoading: boolean;
}

export const AppTableSelection: React.FC<Props> = ({
	className, portfolios, selectedPortfolio, selectPortfolio, isLoading }) => {

	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false)
	const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)

	const { createPortfolio, isCreating } = useCreatePortfolio()

	const [portfolioName, setPortfolioName] = React.useState<string>('')

	const onCancel = (): void => {
		setIsDialogOpen(false)
		setPortfolioName('')
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		createPortfolio(portfolioName)
		setIsDialogOpen(false)
		setPortfolioName('')
	}

	return (
		<div className={cn("flex items-center gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8", className)}>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon" disabled={isLoading || isCreating}>
							{isLoading || isCreating
								? <Loader2Icon size={24} className="2k:size-8 4k:size-11 8k:size-21 animate-spin" />
								: <ListIcon size={24} className="2k:size-8 4k:size-11 8k:size-21" />
							}
							<span className="sr-only">Select portfolio</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						{portfolios?.map((portfolio) =>
							<DropdownMenuItem
								className="justify-between"
								key={portfolio.id}
								onClick={() => selectPortfolio(portfolio)}
								disabled={isLoading}>
								{portfolio.name}
								{selectedPortfolio?.id === portfolio.id && <CheckIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />}
							</DropdownMenuItem>
						)}
						<DialogTrigger asChild>
							<DropdownMenuItem onClick={() => { setIsMenuOpen(false); setIsDialogOpen(true) }} disabled={isLoading}>
								Create new...
							</DropdownMenuItem>
						</DialogTrigger>
					</DropdownMenuContent>
				</DropdownMenu>
				<AppTableDialog
					mode="create"
					portfolioName={portfolioName} setPortfolioName={setPortfolioName}
					onCancel={onCancel} onSubmit={onSubmit} />
			</Dialog>

			<p className="font-medium text-lg 2k:text-2xl 4k:text-4xl 8k:text-7xl">
				{selectedPortfolio?.name || "Select portfolio"}
				{isLoading && <span className="ml-1 2k:ml-1.5 4k:ml-2 8k:ml-4 animate-pulse">...</span>}
			</p>

		</div>
	)
}