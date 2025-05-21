import React from 'react';
import { cn } from '@/lib/utils';
import { Separator, SidebarTrigger } from '../ui';
import { AppBreadcrumb, ModeToggle } from './index';

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn('flex', className)}>
			<SidebarTrigger />
			<Separator orientation={"vertical"} />
			<AppBreadcrumb />
			<Separator orientation={"vertical"} />
			<ModeToggle />
		</header>
	);
};