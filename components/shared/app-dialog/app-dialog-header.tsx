import React from 'react';
import { cn } from '@/lib/utils';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui';

interface Props {
	className?: string;
	mode: string;
}

export const AppDialogHeader: React.FC<Props> = ({ className, mode, }) => {
	console.log(mode)

	const title =
		mode === "createPortfolio" ? "Create New Portfolio"
			: mode === "editPortfolio" ? "Edit Portfolio"
				: "Add Asset to Portfolio"

	const description =
		mode === "createPortfolio" ? "Set up your new portfolio here. Click save when ready."
			: mode === "editPortfolio" ? "Make changes to your portfolio here. Click save when ready."
				: "Add a new asset to your portfolio. Click save when ready."

	return (
		<DialogHeader className={cn("", className)}>
			<DialogTitle>{title}</DialogTitle>
			<DialogDescription>{description}</DialogDescription>
		</DialogHeader>
	)
}