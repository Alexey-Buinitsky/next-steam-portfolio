import React from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '../logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, SidebarContextProps, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui';
import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';

import avatar from './../../../public/images/avatar.jpg'

interface Props {
	className?: string;
	sidebar: SidebarContextProps;
}

export const AppSidebarFooter: React.FC<Props> = ({ className, sidebar }) => {
	return (
		<SidebarFooter className={cn('', className)}>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton size={'lg'} variant={'outline'}>
								<Logo title={'shadcn'} subtitle={'m@example.com'} image={avatar} />
								<span className="flex shrink-0 ml-auto">
									<ChevronsUpDownIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
								</span>
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent side={sidebar.isMobile ? 'top' : 'right'} align='end'>
							<DropdownMenuLabel>
								<Logo title={'shadcn'} subtitle={'m@example.com'} image={avatar} />
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<span className="flex shrink-0">
									<LogOutIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
								</span>
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	)
}