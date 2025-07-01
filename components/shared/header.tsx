import React from 'react';
import { cn } from '@/lib/utils';
import { Separator, SidebarTrigger } from '@/components/ui';
import { AppBreadcrumb, ModeToggle } from '@/components/shared';

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn('flex justify-between items-center gap-2 p-2 border-b dark:border-input 2k:p-2.5 4k:p-4 8k:p-8', className)}>
			<div className='flex items-center gap-2 h-full 2k:gap-2.5 4k:gap-4 8k:gap-8'>
				<SidebarTrigger />
				<Separator className='data-[orientation=vertical]:h-[60%]' orientation={"vertical"} />
				<AppBreadcrumb />
			</div>
			<ModeToggle />
		</header>
	)
}