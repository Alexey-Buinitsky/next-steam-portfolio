import React from 'react';
import NextTopLoader from 'nextjs-toploader';
import { SidebarProvider, Toaster } from '@/components/ui';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

// import { BackgroundSyncProvider } from './background-sync-provider';

export const LayoutProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<QueryProvider>
			{/* <BackgroundSyncProvider> */}
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<SidebarProvider>
					{children}
				</SidebarProvider>
				<NextTopLoader speed={1000} showSpinner={false} />
				<Toaster position="bottom-right" richColors closeButton />
			</ThemeProvider>
			{/* </BackgroundSyncProvider> */}
		</QueryProvider>
	)
}