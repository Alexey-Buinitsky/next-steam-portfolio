import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Dialog, DialogTrigger } from '@/components/ui';
import { Loader2Icon, SettingsIcon } from 'lucide-react';
import { AppTableDialog } from './app-table-dialog';
import { useEditPortfolio, useDeletePortfolio } from '@/hooks/use-portfolios';
import { Portfolio } from '@prisma/client';

interface Props {
	className?: string;
	selectedPortfolio: Portfolio | undefined;
	isLoading: boolean;
}

export const AppTableSettings: React.FC<Props> = ({ className, selectedPortfolio, isLoading }) => {

	const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)

	const [portfolioName, setPortfolioName] = React.useState<string>("")

	const { editPortfolio } = useEditPortfolio()
	const { deletePortfolio } = useDeletePortfolio()

	React.useEffect(() => {
		if (selectedPortfolio && selectedPortfolio.name.length > 0) {
			setPortfolioName(selectedPortfolio.name)
		}
	}, [selectedPortfolio])

	const onDelete = (): void => {
		setIsDialogOpen(false)
		deletePortfolio(selectedPortfolio!.id)
	}

	const onCancel = (): void => {
		setIsDialogOpen(false)
		setPortfolioName(selectedPortfolio!.name)
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()

		editPortfolio({ id: selectedPortfolio!.id, name: portfolioName.trim() })
		setIsDialogOpen(false)
	}

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon" className={cn("", className)} disabled={isLoading || !selectedPortfolio}>
					{isLoading
						? <Loader2Icon size={24} className="2k:size-8 4k:size-11 8k:size-21 animate-spin" />
						: <SettingsIcon size={20} className="2k:size-6.5 4k:size-10 8k:size-20" />
					}
					<span className="sr-only">Portfolio Settings</span>
				</Button>
			</DialogTrigger>
			<AppTableDialog
				mode="edit"
				portfolioName={portfolioName} setPortfolioName={setPortfolioName}
				onDelete={onDelete} onCancel={onCancel} onSubmit={onSubmit} />
		</Dialog>
	)
}