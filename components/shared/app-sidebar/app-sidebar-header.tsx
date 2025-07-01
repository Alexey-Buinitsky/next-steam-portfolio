import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared';
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui';
import { BriefcaseBusinessIcon } from 'lucide-react';

interface Props {
	className?: string;
}

export const AppSidebarHeader: React.FC<Props> = ({ className }) => {
	return (
		<SidebarHeader className={cn('', className)}>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton asChild size={'lg'}>
						<Link href='/'>
							<Logo title={'A&D'} subtitle={'Steam Portfolio'} icon={BriefcaseBusinessIcon} />
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	)
}