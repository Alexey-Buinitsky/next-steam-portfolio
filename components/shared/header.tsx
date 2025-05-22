import React from 'react';
import { cn } from '@/lib/utils';
import { Separator, SidebarTrigger } from '../ui';
import { AppBreadcrumb, ModeToggle } from './index';

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn('flex justify-between items-center p-2 border-b', className)}>
			<div className='flex items-center gap-2 h-full'>
				<SidebarTrigger />
				<Separator className='data-[orientation=vertical]:h-[60%]' orientation={"vertical"} />
				<AppBreadcrumb />
			</div>
			<ModeToggle />
		</header>
	)
}