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
							<SidebarMenuButton size={'lg'}>
								<Logo title={'shadcn'} subtitle={'m@example.com'} image={avatar} />
								<ChevronsUpDownIcon className="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent side={sidebar.isMobile ? 'top' : 'right'} align='end' className="w-[var(--radix-popper-anchor-width)]">
							<DropdownMenuLabel>
								<Logo title={'shadcn'} subtitle={'m@example.com'} image={avatar} />
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<LogOutIcon size={16} />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
};