import React from 'react';
import { cn } from '@/lib/utils';
import { Button, DialogFooter } from '@/components/ui';
import { TrashIcon } from 'lucide-react';

interface Props {
	className?: string;
	mode: string;
	onCancel: () => void;
	onDelete?: () => void;
}

export const AppDialogFooter: React.FC<Props> = ({ className, mode, onDelete, onCancel }) => {
	return (
		<DialogFooter className={cn(mode === "editPortfolio" ? "sm:justify-between" : "", className)}>
			{mode === "editPortfolio" &&
				<Button variant="destructive" size="icon" onClick={onDelete}>
					<TrashIcon />
					<span className="sr-only">Delete Portfolio</span>
				</Button>}

			<div className="flex gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8">
				<Button variant="outline" size="default" onClick={onCancel}>Cancel</Button>
				<Button variant="default" size="default"
					form={mode === "createPortfolio" ? "createPortfolio" : mode === "editPortfolio" ? "editPortfolio" : "addAsset"} type="submit">
					{mode === "createPortfolio" ? "Create Portfolio" : mode === "editPortfolio" ? "Save changes" : "Add Asset"}
				</Button>
			</div>
		</DialogFooter >
	)
}