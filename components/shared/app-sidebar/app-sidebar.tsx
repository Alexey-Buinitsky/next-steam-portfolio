'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarRail, useSidebar } from '@/components/ui';
import { AppSidebarHeader, AppSidebarFooter, AppSidebarContent } from '@/components/shared/app-sidebar';

interface Props {
	className?: string;
}

export const AppSidebar: React.FC<Props> = ({ className }) => {

	const sidebar = useSidebar()

	return (
		<Sidebar className={cn('', className)} collapsible={'icon'}>
			<AppSidebarHeader />
			<AppSidebarContent sidebar={sidebar} />
			<AppSidebarFooter sidebar={sidebar} />
			<SidebarRail />
		</Sidebar>
	);
};