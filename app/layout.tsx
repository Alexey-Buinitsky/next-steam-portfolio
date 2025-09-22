import { Geist, Geist_Mono } from "next/font/google";
import { Header, AppSidebar, LayoutProvider, } from "@/components/shared";
import { SidebarInset } from "@/components/ui";
import { LayoutMetadata } from "@/data/layout-metadata";
import "@/app/globals.css";
import { BackgroundSyncProvider } from "@/components/shared/providers/background-sync-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata = LayoutMetadata

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<BackgroundSyncProvider>
					<LayoutProvider>
						<AppSidebar />
						<SidebarInset className="overflow-x-auto">
							<Header />
							<div className="relative h-full p-2 2k:p-2.5 4k:p-4 8k:p-8">
								{children}
							</div>
						</SidebarInset>
					</LayoutProvider>
				</BackgroundSyncProvider>
			</body>
		</html>
	)
}