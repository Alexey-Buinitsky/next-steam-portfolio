import React from 'react';
import { cn } from '@/lib/utils';
import { Button, DialogFooter } from '@/components/ui';
import { TrashIcon } from 'lucide-react';

interface Props {
	className?: string;
	mode: string;
	onCancel: () => void;
	onDelete?: () => void;
	onSubmit?: () => void;
}

export const AppDialogFooter: React.FC<Props> = ({ className, mode, onDelete, onSubmit, onCancel }) => {
	return (
		<DialogFooter className={cn(mode === "editPortfolio" ? "sm:justify-between" : "", className)}>

			{mode === "editPortfolio" && <Button variant="destructive" size="icon" onClick={onDelete}><TrashIcon size={20} className="2k:size-6.5 4k:size-10 8k:size-20" /><span className="sr-only">Delete Portfolio</span></Button>}

			{mode === "deletePortfolioAssets"
				? <div className="flex gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
					<Button variant="outline" size="default" onClick={onCancel}>Cancel</Button>
					<Button variant="destructive" size="default" onClick={onSubmit}>Delete</Button>
				</div>
				: <div className="flex gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
					<Button variant="outline" size="default" onClick={onCancel}>Cancel</Button>
					<Button variant="default" size="default" type="submit"
						form={mode === "createPortfolio" ? "createPortfolio" : mode === "editPortfolio" ? "editPortfolio" : mode === "createPortfolioAsset" ? "createPortfolioAsset" : "editPortfolioAsset"} >
						{mode === "createPortfolio" ? "Create" : mode === "editPortfolio" ? "Save changes" : mode === "createPortfolioAsset" ? "Add" : "Save changes"}
					</Button>
				</div>
			}
		</DialogFooter >
	)
}