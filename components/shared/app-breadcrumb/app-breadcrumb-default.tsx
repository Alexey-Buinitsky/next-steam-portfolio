import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../ui';

interface Props {
	className?: string;
	breadcrumbs: {
		href: string;
		label: string;
		isCurrent: boolean;
	}[];
}

export const AppBreadcrumbDefault: React.FC<Props> = ({ className, breadcrumbs }) => {
	return (
		<Breadcrumb className={cn('', className)}>
			<BreadcrumbList>

				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/">Home</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				{breadcrumbs.map((crumb, index) => (
					<React.Fragment key={crumb.href}>
						<BreadcrumbItem>
							{crumb.isCurrent
								? <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
								: <BreadcrumbLink asChild>
									<Link href={crumb.href}>{crumb.label}</Link>
								</BreadcrumbLink>
							}
						</BreadcrumbItem>
						{index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}

			</BreadcrumbList>
		</Breadcrumb>
	)
}