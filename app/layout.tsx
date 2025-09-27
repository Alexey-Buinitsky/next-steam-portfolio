import { Geist, Geist_Mono } from "next/font/google";
import { Header, AppSidebar, LayoutProvider, } from "@/components/shared";
import { SidebarInset } from "@/components/ui";
import { initializeBackgroundSync } from "@/lib/synchronization";
import { LayoutMetadata } from "@/data/layout-metadata";
import "@/app/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata = LayoutMetadata

// if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
//   // Запускаем только в продакшене, не во время сборки
//   const isBuildTime = process.env.npm_lifecycle_event === 'build';
//   if (!isBuildTime) {
//     initializeBackgroundSync()
//   }
// }
// if (typeof window === 'undefined') {
//   // Проверяем, что это не сборка и не preview режим
//   const isBuild = process.env.npm_lifecycle_event === 'build';
//   const isVercelPreview = process.env.VERCEL_ENV === 'preview';
  
//   // Запускаем только в production режиме на Vercel
//   if (process.env.NODE_ENV === 'production' && !isBuild && !isVercelPreview) {
//     initializeBackgroundSync();
//   }
// }

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<LayoutProvider>
						<AppSidebar />
						<SidebarInset className="overflow-x-auto">
							<Header />
							<div className="relative h-full p-2 2k:p-2.5 4k:p-4 8k:p-8">
								{children}
							</div>
						</SidebarInset>
					</LayoutProvider>
			</body>
		</html>
	)
}