import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { SettingsIcon } from 'lucide-react';

interface Props {
	className?: string;
}

export const AppTableSettings: React.FC<Props> = ({ className }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon" className='2k:size-12 4k:size-18 8k:size-36'>
					<SettingsIcon size={20} className="2k:size-6.5 4k:size-10 8k:size-20" />
					<span className="sr-only">Portfolio Settings</span>
				</Button>
			</DialogTrigger>
			<DialogContent className={cn("", className)}>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your account
						and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}