'use client'

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks';
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
		url: "/market",
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

	const debouncedIsOpen = useDebounce(sidebar.open, 300)

	return (
		<SidebarContent className={cn(className)}>
			<SidebarGroup>
				<SidebarGroupLabel>Navigation</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{debouncedIsOpen || sidebar.isMobile ? (
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
	)
}