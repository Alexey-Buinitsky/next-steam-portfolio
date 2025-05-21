import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui';

interface Props {
	className?: string;
	hiddenItems: {
		href: string;
		label: string;
	}[];
	visibleItems: {
		href: string;
		label: string;
		isCurrent: boolean;
	}[];
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppBreadcrumbCollapsed: React.FC<Props> = ({ className, hiddenItems, visibleItems, open, setOpen }) => {
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
							: <BreadcrumbLink asChild>
									<Link href={item.href}>{item.label}</Link>
								</BreadcrumbLink>
							}
						</BreadcrumbItem>
						{index < visibleItems.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}

			</BreadcrumbList>
		</Breadcrumb>
	)
}