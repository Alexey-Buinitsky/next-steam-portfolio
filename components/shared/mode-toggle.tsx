"use client"

import { useTheme } from "next-themes"
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui"
import { Moon, Sun } from "lucide-react"

export const ModeToggle: React.FC = () => {

	const { setTheme } = useTheme()

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
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}