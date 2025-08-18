"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"
import { CircleAlertIcon, CircleCheckIcon, XIcon } from "lucide-react"
import { Global, css } from "@emotion/react"

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme()

	return (
		<>
			<Global styles={css`
        :root {
          --toast-width: 356px;
          --toast-gap: 14px;
          --toast-offset-top: 24px;
          --toast-offset-right: 24px;
          --toast-offset-bottom: 24px;
          --toast-offset-left: 24px;

          @media (min-width: 160rem) {
            --toast-width: calc(356px * 1.33);
            --toast-gap: 18px;
            --toast-offset-top: calc(24px * 1.33);
            --toast-offset-right: calc(24px * 1.33);
            --toast-offset-bottom: calc(24px * 1.33);
            --toast-offset-left: calc(24px * 1.33);
          }

          @media (min-width: 240rem) {
            --toast-width: calc(356px * 2);
            --toast-gap: 28px;
            --toast-offset-top: calc(24px * 2);
            --toast-offset-right: calc(24px * 2);
            --toast-offset-bottom: calc(24px * 2);
            --toast-offset-left: calc(24px * 2);
          }

          @media (min-width: 480rem) {
            --toast-width: calc(356px * 4);
            --toast-gap: 56px;
            --toast-offset-top: calc(24px * 4);
            --toast-offset-right: calc(24px * 4);
            --toast-offset-bottom: calc(24px * 4);
            --toast-offset-left: calc(24px * 4);
          }
        }
      `} />

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
						'--normal-bg': 'var(--popover)',
						'--normal-text': 'var(--popover-foreground)',
						'--normal-border': 'var(--border)',
						
						'--width': 'var(--toast-width)',
						'--gap': 'var(--toast-gap)',
						'--offset-top': 'var(--toast-offset-top)',
						'--offset-right': 'var(--toast-offset-right)',
						'--offset-bottom': 'var(--toast-offset-bottom)',
						'--offset-left': 'var(--toast-offset-left)',

						'--toast-svg-margin-start': '0',
						'--toast-svg-margin-end': '0',
						'--toast-icon-margin-start': '0',
						'--toast-icon-margin-end': '0',
					} as React.CSSProperties
				}
				{...props}
			/>
		</>
	)
}

export { Toaster }