import React from 'react';
import NextTopLoader from 'nextjs-toploader';
import { SidebarProvider, Toaster } from '@/components/ui';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './auth-provider';

export const LayoutProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<QueryProvider>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<AuthProvider>
					<SidebarProvider>
						{children}
					</SidebarProvider>
					<NextTopLoader speed={1000} showSpinner={false} />
					<Toaster position="bottom-right" richColors closeButton />
				</AuthProvider>
			</ThemeProvider>
		</QueryProvider>
	)
}