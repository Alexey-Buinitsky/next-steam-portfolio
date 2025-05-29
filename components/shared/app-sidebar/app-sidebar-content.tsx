'use client'

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SidebarContent, SidebarContextProps, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui';
import { BriefcaseBusinessIcon, ChartCandlestickIcon, CurrencyIcon, HomeIcon, TrendingUpDownIcon } from 'lucide-react';

interface Props {
	className?: string;
	sidebar: SidebarContextProps;
}

const items = [
	{
		title: "Home",
		url: "/",
		icon: HomeIcon,
	},
	{
		title: "Portfolio",
		url: "/portfolio",
		icon: BriefcaseBusinessIcon,
	},
	{
		title: "Market",
		url: "/",
		icon: ChartCandlestickIcon,
	},
	{
		title: "Currencies",
		url: "/",
		icon: CurrencyIcon,
	},
	{
		title: "Trends",
		url: "/",
		icon: TrendingUpDownIcon,
	},
]

export const AppSidebarContent: React.FC<Props> = ({ className, sidebar }) => {

	const [isOpen, setIsOpen] = React.useState(false);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setIsOpen(sidebar.open);
		}, 300);

		return () => clearTimeout(timer);
	}, [sidebar.open]);

	return (
		<SidebarContent className={cn(className)}>
			<SidebarGroup>
				<SidebarGroupLabel>Navigation</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{isOpen || sidebar.isMobile ? (
							items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<span className="flex shrink-0">
												<item.icon size={32} className='2k:size-11 4k:size-16 8k:size-32' />
											</span>
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))
						) : (
							<TooltipProvider>
								{items.map((item) => (
									<Tooltip key={item.title}>
										<TooltipTrigger asChild>
											<SidebarMenuItem>
												<SidebarMenuButton asChild>
													<Link href={item.url}>
														<span className="flex shrink-0">
															<item.icon size={32} className='2k:size-11 4k:size-16 8k:size-32' />
														</span>
														<span>{item.title}</span>
													</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										</TooltipTrigger>
										<TooltipContent side="right">
											<p>{item.title}</p>
										</TooltipContent>
									</Tooltip>
								))}
							</TooltipProvider>
						)}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	);
};