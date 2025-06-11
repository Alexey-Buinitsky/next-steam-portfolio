import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] active:translate-y-[1px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive 2k:text-lg 4k:text-3xl 8k:text-6xl",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				secondary:
					"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
				ghost:
					"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 gap-2 px-4 has-[>svg]:px-3 2k:h-12 4k:h-18 8k:h-36 2k:gap-2.5 4k:gap-4 8k:gap-8 2k:px-5 4k:px-8 8k:px-16 2k:has-[>svg]:px-4 4k:has-[>svg]:px-6 8k:has-[>svg]:px-12",
				sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 gap-2.5 px-5 has-[>svg]:px-3.5",
				icon: "size-9 2k:size-12 4k:size-18 8k:size-36",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = ({ className, variant, size, asChild = false, ...props }: ButtonProps) => {

	const Comp = asChild ? Slot : "button"

	return (
		<Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))}{...props} />
	)
}

export { Button, buttonVariants }