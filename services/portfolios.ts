import { apiInstance } from './api-instance';
import { apiRoutes } from './api-routes';
import { calculateFee, calculatePercentage } from '@/lib';
import { Asset, Portfolio, PortfolioAsset } from '@prisma/client';

const handleApiError = (error: unknown, context: string) => {
	console.error(`[${context}] Error:`, error)
	throw new Error(`Failed to ${context.toLowerCase()}`)
}

export const portfoliosApi = {

	fetchPortoflios: async (): Promise<Portfolio[]> => {
		try {
			return (await apiInstance.get<Portfolio[]>(apiRoutes.PORTFOLIOS)).data
		} catch (error) {
			throw handleApiError(error, 'fetchPortfolios')
		}
	},

	createPortfolio: async (name: string): Promise<{ message: string }> => {
		try {
			return (await apiInstance.post<{ message: string }>(apiRoutes.PORTFOLIOS, { name })).data
		} catch (error) {
			throw handleApiError(error, 'createPortfolio')
		}
	},

	selectPortfolio: async (id: number): Promise<{ message: string }> => {
		try {
			return (await apiInstance.patch<{ message: string }>(`${apiRoutes.PORTFOLIOS}/${id}/select`, { isActive: true })).data
		} catch (error) {
			throw handleApiError(error, 'selectPortfolio')
		}
	},

	editPortfolio: async (id: number, name: string): Promise<{ message: string }> => {
		try {
			return (await apiInstance.patch<{ message: string }>(`${apiRoutes.PORTFOLIOS}/${id}/edit`, { name })).data
		} catch (error) {
			throw handleApiError(error, 'editPortfolio')
		}
	},


	deletePortfolio: async (id: number): Promise<{ message: string }> => {
		try {
			return (await apiInstance.delete<{ message: string }>(`${apiRoutes.PORTFOLIOS}/${id}`)).data
		} catch (error) {
			throw handleApiError(error, 'deletePortfolio')
		}
	},

	fetchPortfolioAssets: async (id: number): Promise<PortfolioAsset[]> => {
		try {
			return (await apiInstance.get<PortfolioAsset[]>(`${apiRoutes.PORTFOLIOS}/${id}/assets`)).data
		} catch (error) {
			throw handleApiError(error, 'fetchAssets')
		}
	},

	addPortfolioAsset: async (id: number, selectedAsset: Asset, quantity: number, buyPrice: number): Promise<{ message: string }> => {
		try {
			const currentPrice = selectedAsset.price ? selectedAsset.price / 100 : buyPrice

			const totalInvested = buyPrice * quantity
			const totalWorth = currentPrice * quantity
			
			const percentage = calculatePercentage(currentPrice, buyPrice)

			const gain = totalWorth - totalInvested

			const fee5Percent = calculateFee(totalWorth, 23)
			const fee10Percent = calculateFee(totalWorth, 11.5)
			const gainAfterFees = gain - fee5Percent - fee10Percent

			return (await apiInstance.post<{ message: string }>(`${apiRoutes.PORTFOLIOS}/${id}/assets`, { selectedAsset, quantity, buyPrice, totalInvested, totalWorth, percentage, gain, gainAfterFees, },)).data
		} catch (error) {
			throw handleApiError(error, 'addPortfolioAsset')
		}
	},
}