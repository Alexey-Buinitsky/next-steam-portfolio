'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AppBreadcrumbCollapsed, AppBreadcrumbDefault, AppBreadcrumbHome, } from '@/components/shared/app-breadcrumb';
import { useIsMobile } from '@/hooks';

interface Props {
	className?: string;
}

export const AppBreadcrumb: React.FC<Props> = ({ className }) => {

	const isMobile = useIsMobile()
	const ITEMS_TO_DISPLAY = isMobile ? 2 : 3

	const pathname = usePathname()
	const [open, setOpen] = React.useState(false)

	if (pathname === '/') {
		return <AppBreadcrumbHome className={cn('', className)} />
	}

	const pathSegments = pathname.split('/').filter(segment => segment !== '')

	const breadcrumbs = pathSegments.map((segment, index) => {
		const href = '/' + pathSegments.slice(0, index + 1).join('/')
		const label = segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
		return { href, label, isCurrent: index === pathSegments.length - 1 }
	});

	if (breadcrumbs.length <= ITEMS_TO_DISPLAY) {
		return <AppBreadcrumbDefault className={cn('', className)} breadcrumbs={breadcrumbs} />
	}

	const hiddenItems = breadcrumbs.slice(0, breadcrumbs.length - ITEMS_TO_DISPLAY + 1)
	const visibleItems = breadcrumbs.slice(-ITEMS_TO_DISPLAY + 1)

	return (
		<AppBreadcrumbCollapsed
			className={cn('', className)}
			hiddenItems={hiddenItems}
			visibleItems={visibleItems}
			open={open}
			setOpen={setOpen}
		/>
	)
}