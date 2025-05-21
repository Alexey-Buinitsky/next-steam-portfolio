'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui"

interface Props {
	className?: string;
}

const ITEMS_TO_DISPLAY = 3

export const AppBreadcrumb: React.FC<Props> = ({ className }) => {

	const pathname = usePathname()
	const [open, setOpen] = React.useState(false)

	if (pathname === '/') {
		return (
			<Breadcrumb className={cn('', className)}>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbPage>Home</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		);
	}

	const pathSegments = pathname.split('/').filter(segment => segment !== '')

	const breadcrumbs = pathSegments.map((segment, index) => {
		const href = '/' + pathSegments.slice(0, index + 1).join('/')
		const label = segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
		return { href, label, isCurrent: index === pathSegments.length - 1, }
	})

	if (breadcrumbs.length <= ITEMS_TO_DISPLAY) {
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
									: <>
										<BreadcrumbLink asChild>
											<Link href={crumb.href}>{crumb.label}</Link>
										</BreadcrumbLink>
									</>
								}
							</BreadcrumbItem>
							{index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
						</React.Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		);
	}

	const hiddenItems = breadcrumbs.slice(1, breadcrumbs.length - ITEMS_TO_DISPLAY + 1)
	const visibleItems = breadcrumbs.slice(-ITEMS_TO_DISPLAY + 1)

	return (
		<Breadcrumb className={cn('', className)}>
			<BreadcrumbList>

				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/">Home</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				<BreadcrumbItem>
					<DropdownMenu open={open} onOpenChange={setOpen}>
						<DropdownMenuTrigger aria-label="Toggle menu">
							<BreadcrumbEllipsis className="size-4" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{hiddenItems.map((item, index) => (
								<DropdownMenuItem key={index}>
									<Link href={item.href}>{item.label}</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				{visibleItems.map((item, index) => (
					<React.Fragment key={item.href}>
						<BreadcrumbItem>
							{item.isCurrent
								? <BreadcrumbPage>{item.label}</BreadcrumbPage>
								: <>
									<BreadcrumbLink asChild>
										<Link href={item.href}>{item.label}</Link>
									</BreadcrumbLink>
								</>
							}
						</BreadcrumbItem>
						{index < visibleItems.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}