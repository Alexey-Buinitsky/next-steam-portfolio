import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { ChevronsUpDownIcon } from 'lucide-react';

interface Props {
	className?: string;
}

export const AppTableAddition: React.FC<Props> = ({ className }) => {

	const [isOpenMenu, setIsOpenMenu] = React.useState(false)
	const [isOpenDialog, setIsOpenDialog] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState("")

	return (
		<Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
			<Popover open={isOpenMenu} onOpenChange={setIsOpenMenu}>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" aria-expanded={isOpenMenu} className="w-[200px] justify-between">
						Add item
						<ChevronsUpDownIcon size={16} className="ml-2 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput
							placeholder="Type to search..."
							value={searchValue}
							onValueChange={setSearchValue}
						/>
						<CommandList>
							<CommandEmpty>No item found.</CommandEmpty>
							<CommandGroup>
								<DialogTrigger asChild>
									<CommandItem onSelect={() => { setIsOpenMenu(false); setIsOpenDialog(true) }}>
										Case
									</CommandItem>
								</DialogTrigger>
								<DialogTrigger asChild>
									<CommandItem onSelect={() => { setIsOpenMenu(false); setIsOpenDialog(true) }}>
										Weapon
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
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