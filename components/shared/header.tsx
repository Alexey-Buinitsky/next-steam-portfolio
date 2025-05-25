import React from 'react';
import { cn } from '@/lib/utils';
import { Separator, SidebarTrigger } from '../ui';
import { AppBreadcrumb, ModeToggle } from './index';

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn('flex justify-between items-center gap-2 p-2 border-b 2k:p-4 4k:p-6 8k:p-12', className)}>
			<div className='flex items-center gap-2 h-full 2k:gap-4 4k:gap-6 8k:gap-12'>
				<SidebarTrigger />
				<Separator className='data-[orientation=vertical]:h-[60%]' orientation={"vertical"} />
				<AppBreadcrumb />
			</div>
			<ModeToggle />
		</header>
	)
}