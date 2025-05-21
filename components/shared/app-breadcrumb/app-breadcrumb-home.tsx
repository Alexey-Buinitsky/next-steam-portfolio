import React from 'react';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '../../ui';

interface Props {
	className?: string;
}

export const AppBreadcrumbHome: React.FC<Props> = ({ className }) => {
	return (
		<Breadcrumb className={cn('', className)}>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbPage>Home</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}