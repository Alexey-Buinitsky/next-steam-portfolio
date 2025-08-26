"use client"

import { useTheme } from "next-themes"
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui"
import { CheckIcon, Moon, Sun } from "lucide-react"

export const ModeToggle: React.FC = () => {

	const themes: string[] = ["Light", "Dark", "System"]
	const { theme, setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun size={20} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 2k:size-6.5 4k:size-10 8k:size-20" />
					<Moon size={20} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 2k:size-6.5 4k:size-10 8k:size-20" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{themes.map((strTheme) => (
					<DropdownMenuItem className="justify-between" key={strTheme} onClick={() => setTheme(strTheme.toLowerCase())}>
						{strTheme}
						{strTheme.toLowerCase() === theme && <CheckIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}