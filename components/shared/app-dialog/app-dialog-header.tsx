import React from 'react';
import { cn } from '@/lib/utils';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui';

interface Props {
	className?: string;
	mode: string;
}

export const AppDialogHeader: React.FC<Props> = ({ className, mode, }) => {

	const title =
		mode === "createPortfolio" ? "Create New Portfolio"
			: mode === "editPortfolio" ? "Edit Portfolio"
				: mode === "createPortfolioAsset" ? "Add Asset to Portfolio"
					: mode === "editPortfolioAsset" ? "Edit Portfolio Asset"
						: "Delete Portfolio Asset"

	const description =
		mode === "createPortfolio" ? "Set up your new portfolio here. Click save when ready."
			: mode === "editPortfolio" ? "Make changes to your portfolio here. Click save when ready."
				: mode === "createPortfolioAsset" ? "Select asset, enter quantity and buy price. Click save to add."
					: mode === "editPortfolioAsset" ? "Make changes to your portfolio asset here. Click save when ready."
						: "Are you sure you want to delete this asset from your portfolio? This action cannot be undone."

	return (
		<DialogHeader className={cn("", className)}>
			<DialogTitle>{title}</DialogTitle>
			<DialogDescription>{description}</DialogDescription>
		</DialogHeader>
	)
}