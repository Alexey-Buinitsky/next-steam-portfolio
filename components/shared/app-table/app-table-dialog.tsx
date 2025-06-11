import React from 'react';
import { cn } from '@/lib/utils';
import { Button, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Input, Label } from '@/components/ui';
import { TrashIcon } from 'lucide-react';

interface Props {
	className?: string;
	mode: "create" | "edit";
	portfolioName: string;
	setPortfolioName: React.Dispatch<React.SetStateAction<string>>;
	onCancel: () => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onDelete?: () => void;
}

export const AppTableDialog: React.FC<Props> = ({ className, mode, portfolioName, setPortfolioName, onCancel, onSubmit, onDelete }) => {

	return (
		<DialogContent className={cn("", className)}>
			<DialogHeader>
				<DialogTitle>
					{mode === "create" ? "Create New Portfolio" : "Edit Portfolio"}
				</DialogTitle>
				<DialogDescription>
					{mode === "create"
						? "Set up your new portfolio here. Click save when ready."
						: "Make changes to your portfolio here. Click save when ready."}
				</DialogDescription>
			</DialogHeader>

			<form
				className="grid gap-3 2k:gap-4 4k:gap-6 8k:gap-12"
				action={mode === "create" ? "createPortfolio" : "editPortfolio"}
				id={mode === "create" ? "createPortfolio" : "editPortfolio"}
				onSubmit={(e) => onSubmit(e)}
			>
				<Label htmlFor="portfolioName">Portfolio Name</Label>
				<Input id="portfolioName" minLength={1} placeholder="Enter a name..."
					value={portfolioName}
					onChange={(e) => setPortfolioName(e.target.value)}
				/>
			</form>

			<DialogFooter className={mode === "edit" ? "sm:justify-between" : ""}>
				{mode === "edit" &&
					<Button variant="destructive" size="icon" onClick={onDelete}>
						<TrashIcon />
						<span className="sr-only">Delete Portfolio</span>
					</Button>}

				<div className="flex gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
					<Button variant="outline" size="default" onClick={onCancel}>Cancel</Button>
					<Button variant="default" size="default" disabled={portfolioName.trim().length < 1}
						form={mode === "create" ? "createPortfolio" : "editPortfolio"} type="submit">
						{mode === "create" ? "Create Portfolio" : "Save changes"}
					</Button>
				</div>
			</DialogFooter>
		</DialogContent>
	)
}