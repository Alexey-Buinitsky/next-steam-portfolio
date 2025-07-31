"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"
import { CircleAlertIcon, CircleCheckIcon, XIcon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme()

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast: "!gap-2 2k:!gap-2.5 4k:!gap-4 8k:!gap-8 !p-4 2k:!p-5.5 4k:!p-8 8k:!p-16",
					title: "font-medium text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl",
					icon: "!size-max",
					closeButton: "!size-5 2k:!size-6.5 4k:!size-10 8k:!size-20",
					actionButton: "!text-sm !h-6 !transition-all hover:!bg-primary/90 active:translate-y-[1px] 2k:!h-8 4k:!h-12 8k:!h-24 2k:!px-4 2k:!py-2 4k:!px-6 4k:!py-3 8k:!px-8 8k:!py-4 2k:!text-lg 4k:!text-3xl 8k:!text-6xl",
				}
			}}
			icons={{
				close: <XIcon size={12} className="2k:size-4 4k:size-6 8k:size-12" />,
				success: <CircleCheckIcon size={20} className="2k:size-6.5 4k:size-10 8k:size-20" />,
				error: <CircleAlertIcon size={20} className="2k:size-6.5 4k:size-10 8k:size-20" />
			}}
			style={
				{
					// "--front-toast-height": "55px",

					// "--width": "356px",
					// "--gap": "14px",
					// "--offset-top": "24px",
					// "--offset-right": "24px",
					// "--offset-bottom": "24px",
					// "--offset-left": "24px",

					// "@media (minWidth: 160rem)": {
					// 	"--width": "calc(356px * 1.33)",
					// 	"--gap": "calc(18px)",
					// 	"--offset-top": "calc(24px * 1.33)",
					// 	"--offset-right": "calc(24px * 1.33)",
					// 	"--offset-bottom": "calc(24px * 1.33)",
					// 	"--offset-left": "calc(24px * 1.33)",
					// },

					// "@media (minWidth: 240rem)": {
					// 	"--width": "calc(356px * 2)",
					// 	"--gap": "28px",
					// 	"--offset-top": "calc(24px * 2)",
					// 	"--offset-right": "calc(24px * 2)",
					// 	"--offset-bottom": "calc(24px * 2)",
					// 	"--offset-left": "calc(24px * 2)",
					// },

					// "@media (minWidth: 480rem)": {
          //   "--width": "calc(356px * 4)",
          //   "--gap": "56px",
          //   "--offset-top": "calc(24px * 4)",
          //   "--offset-right": "calc(24px * 4)",
          //   "--offset-bottom": "calc(24px * 4)",
          //   "--offset-left": "calc(24px * 4)",
          // },

					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",

					"--toast-svg-margin-start": 0,
					"--toast-svg-margin-end": 0,
					"--toast-icon-margin-start": 0,
					"--toast-icon-margin-end": 0,
				} as React.CSSProperties
			}
			{...props}
		/>
	)
}

export { Toaster }
