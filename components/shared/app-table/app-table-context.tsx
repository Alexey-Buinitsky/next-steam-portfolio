"use client"

import React from 'react';
import { usePortfolios } from '@/hooks/use-portfolios';

interface AppTableContextType {
	portfolios: ReturnType<typeof usePortfolios>;
}

const AppTableContext = React.createContext<AppTableContextType | undefined>(undefined)

export const AppTableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const portfolios = usePortfolios()

	return (
		<AppTableContext.Provider value={{ portfolios }}>
			{children}
		</AppTableContext.Provider>
	)
}

export const useAppTable = () => {
	const context = React.useContext(AppTableContext)
	if (context === undefined) { throw new Error('useAppTable must be used within an AppTableProvider') }
	return context
}