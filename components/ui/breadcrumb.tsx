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
				"text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
				"2k:gap-4 8k:gap-8",
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
				"text-sm 2xl:text-base 2k:text-xl 4k:text-3xl 8k:text-6xl",
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
			className={cn("text-foreground font-normal",
				"text-sm 2xl:text-base 2k:text-xl 4k:text-3xl 8k:text-6xl",
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
				"2k:[&>svg]:size-5 4k:[&>svg]:size-7 8k:[&>svg]:size-12",
				className)}
			{...props}
		>
			{children ?? <ChevronRight size={14} className="2k:size-7 4k:size-10 8k:size-20" />}
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
				"size-6 2k:size-7 4k:size-9 8k:size-15",
				className)}
			{...props}
		>
			<MoreHorizontal className="size-4 2k:size-6 4k:size-8 8k:size-14" />
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
