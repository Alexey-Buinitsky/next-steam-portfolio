import React from 'react';
import { cn } from '@/lib/utils';
import { AppDialog } from '@/components/shared';
import { Button, Dialog, DialogTrigger } from '@/components/ui';
import { Loader2Icon, SettingsIcon } from 'lucide-react';
import { Portfolio } from '@prisma/client';

interface Props {
	className?: string;
	deletePortfolio: (id: number) => void;
	editPortfolioName: ({ id, name }: { id: number; name: string; }) => void
	selectedPortfolio: Portfolio | undefined;
	isLoading: boolean;
}

export const AppTableSettings: React.FC<Props> = ({ className, deletePortfolio, editPortfolioName, selectedPortfolio, isLoading }) => {

	const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)

	const onDelete = (): void => {
		deletePortfolio(selectedPortfolio!.id)
		setIsDialogOpen(false)
	}

	const onCancel = (): void => {
		setIsDialogOpen(false)
	}

	const onSubmit = (name: string): void => {
		editPortfolioName({ id: selectedPortfolio!.id, name })
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
				<AppDialog mode="editPortfolio" selectedPortfolio={selectedPortfolio} onDelete={onDelete} onCancel={onCancel} onSubmit={onSubmit} />
		</Dialog>
	)
}