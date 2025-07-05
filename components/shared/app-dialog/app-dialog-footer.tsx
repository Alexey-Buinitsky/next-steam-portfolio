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

			{mode === "editPortfolio" && <Button variant="destructive" size="icon" onClick={onDelete}><TrashIcon /><span className="sr-only">Delete Portfolio</span></Button>}

			{mode === "deletePortfolioAsset"
				? <div className="flex gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
					<Button variant="outline" size="default" onClick={onCancel}>Cancel</Button>
					<Button variant="destructive" size="default" onClick={onSubmit}>Delete Portfolio Asset</Button>
				</div>
				: <div className="flex gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
					<Button variant="outline" size="default" onClick={onCancel}>Cancel</Button>
					<Button variant="default" size="default" type="submit"
						form={mode === "createPortfolio" ? "createPortfolio" : mode === "editPortfolio" ? "editPortfolio" : mode === "createPortfolioAsset" ? "createPortfolioAsset" : "editPortfolioAsset"} >
						{mode === "createPortfolio" ? "Create Portfolio" : mode === "editPortfolio" ? "Save changes" : mode === "createPortfolioAsset" ? "Add Asset" : "Save changes"}
					</Button>
				</div>
			}
		</DialogFooter >
	)
}