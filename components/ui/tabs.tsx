"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return (
		<TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", "2k:gap-2.5 4k:gap-4 8k:gap-8", className)} {...props} />
	)
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List data-slot="tabs-list"
			className={cn(
				"bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
				"2k:h-12.5 4k:h-18 8k:h-36 2k:p-1 4k:p-1.5 8k:p-3",
				className
			)}
			{...props}
		/>
	)
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				"data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[state=active]:pointer-events-none data-[state=inactive]:cursor-pointer",
				"2k:gap-2 4k:gap-3 8k:gap-6 2k:px-2.5 4k:px-4 8k:px-8 2k:py-1.5 4k:py-2 8k:py-4 2k:text-lg 4k:text-3xl 8k:text-6xl",
				className
			)}
			{...props}
		/>
	)
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn("flex-1 outline-none", className)}
			{...props}
		/>
	)
}

export { Tabs, TabsList, TabsTrigger, TabsContent }