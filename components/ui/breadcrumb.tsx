import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
	return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(
				"text-muted-foreground flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-sm break-words",
				"2k:gap-3 4k:gap-5 8k:gap-10",
				className
			)}
			{...props}
		/>
	)
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn("inline-flex items-center gap-1.5", className)}
			{...props}
		/>
	)
}

function BreadcrumbLink({
	asChild,
	className,
	...props
}: React.ComponentProps<"a"> & {
	asChild?: boolean
}) {
	const Comp = asChild ? Slot : "a"

	return (
		<Comp
			data-slot="breadcrumb-link"
			className={cn("hover:text-foreground transition-colors",
				"flex justify-center items-center h-9 2k:h-12 4k:h-18 8k:h-36 font-medium text-sm sm:text-base 2k:text-[21px] 4k:text-[32px] 8k:text-[64px]",
				className
			)}
			{...props}
		/>
	)
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="breadcrumb-page"
			role="link"
			aria-disabled="true"
			aria-current="page"
			className={cn("text-foreground",
				"font-medium text-sm sm:text-base 2k:text-[21px] 4k:text-[32px] 8k:text-[64px]",
				className
			)}
			{...props}
		/>
	)
}

function BreadcrumbSeparator({
	children,
	className,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			className={cn("[&>svg]:size-3.5",
				"2k:[&>svg]:size-4.5 4k:[&>svg]:size-7 8k:[&>svg]:size-14",
				className)}
			{...props}
		>
			{children ?? <ChevronRight size={14} />}
		</li>
	)
}

function BreadcrumbEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			className={cn("flex items-center justify-center",
				"size-9 2k:size-12 4k:size-18 8k:size-36",
				className)}
			{...props}
		>
			<MoreHorizontal size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
			<span className="sr-only">More</span>
		</span>
	)
}

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
}
