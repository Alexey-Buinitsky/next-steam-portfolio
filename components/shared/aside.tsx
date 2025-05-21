import React from 'react';
import { cn } from '@/lib/utils';
import { AppSidebar } from './app-sidebar';

interface Props {
className?: string;
}

export const Aside: React.FC<Props> = ({ className }) => {
	return (
		<aside className={cn('', className)}>
			<AppSidebar />
		</aside>
	);
};