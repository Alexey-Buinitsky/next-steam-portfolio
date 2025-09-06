import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
	return (
		<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 2k:gap-4 4k:gap-6 8k:gap-12">
			<div className="flex items-center text-center">
				<h2 className="font-bold text-7xl 2k:text-8xl 4k:text-[9.5rem] 8k:text-[19.5rem]">404</h2>
				<div className="flex flex-col items-center justify-center border-l-1 ml-3 pl-3 2k:ml-4 2k:pl-4 4k:ml-6 4k:pl-6 8k:ml-12 8k:pl-12">
					<p className="font-medium text-4xl 2k:text-6xl 4k:text-8xl 8k:text-[12rem] animate-bounce">A&D</p>
					<p className="font-medium text-3xl 2k:text-4xl 4k:text-6xl 8k:text-[7.5rem] animate-pulse">Steam Portfolio</p>
				</div>
			</div>
			<Button variant="outline" asChild><Link href="/">Home</Link></Button>
		</div>
	)
}