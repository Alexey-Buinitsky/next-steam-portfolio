"use client"

import React from "react";
import { usePortfolios } from "@/hooks";

interface PortfoliosContextType {
	portfolios: ReturnType<typeof usePortfolios>["portfolios"];
	createPortfolio: ReturnType<typeof usePortfolios>["createPortfolio"];
	selectPortfolio: ReturnType<typeof usePortfolios>["selectPortfolio"];
	selectedPortfolio: ReturnType<typeof usePortfolios>["selectedPortfolio"];
	editPortfolioName: ReturnType<typeof usePortfolios>["editPortfolioName"];
	changePortfolioCurrency: ReturnType<typeof usePortfolios>["changePortfolioCurrency"];
	deletePortfolio: ReturnType<typeof usePortfolios>["deletePortfolio"];
	portfolioAssets: ReturnType<typeof usePortfolios>["portfolioAssets"];
	createPortfolioAsset: ReturnType<typeof usePortfolios>["createPortfolioAsset"];
	deletePortfolioAssets: ReturnType<typeof usePortfolios>["deletePortfolioAssets"];
	editPortfolioAsset: ReturnType<typeof usePortfolios>["editPortfolioAsset"];
	isLoading: ReturnType<typeof usePortfolios>["isLoading"];
	error: ReturnType<typeof usePortfolios>["error"];
}

const PortfoliosContext = React.createContext<PortfoliosContextType | undefined>(undefined)

export const PortfoliosProvider = ({ children }: { children: React.ReactNode }) => {
	const { portfolios, createPortfolio, selectPortfolio, selectedPortfolio, editPortfolioName, changePortfolioCurrency, deletePortfolio, portfolioAssets, createPortfolioAsset, deletePortfolioAssets, editPortfolioAsset, isLoading, error, } = usePortfolios()

	const value = { portfolios, createPortfolio, selectPortfolio, selectedPortfolio, editPortfolioName, changePortfolioCurrency, deletePortfolio, portfolioAssets, createPortfolioAsset, deletePortfolioAssets, editPortfolioAsset, isLoading, error, }

	return (
		<PortfoliosContext.Provider value={value}>
			{children}
		</PortfoliosContext.Provider>
	)
}

export const usePortfoliosContext = () => {
	const context = React.useContext(PortfoliosContext)
	if (context === undefined) {
		throw new Error("usePortfoliosContext must be used within a PortfoliosProvider")
	}
	return context
}