"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui';
import { ListIcon } from 'lucide-react';

interface Props {
	className?: string;
}

export const AppTableSelection: React.FC<Props> = ({ className }) => {

	const [isOpenMenu, setIsOpenMenu] = React.useState(false)
	const [isOpenDialog, setIsOpenDialog] = React.useState(false)

	return (
		<div className={cn("flex items-center gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8", className)}>
			<Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
				<DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon" className='2k:size-12 4k:size-18 8k:size-36'>
							<ListIcon size={24} className="2k:size-8 4k:size-11 8k:size-21" />
							<span className="sr-only">Choose portfolio</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuItem>
							Main
						</DropdownMenuItem>
						<DialogTrigger asChild>
							<DropdownMenuItem onClick={() => { setIsOpenMenu(false); setIsOpenDialog(true) }}>
								Create new...
							</DropdownMenuItem>
						</DialogTrigger>
					</DropdownMenuContent>
				</DropdownMenu>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your account
							and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			<p className='font-medium text-lg 2k:text-2xl 4k:text-4xl 8k:text-7xl'>Main</p>
		</div>
	)
}