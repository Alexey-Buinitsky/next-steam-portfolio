import { apiInstance } from './api-instance';
import { apiRoutes } from './api-routes';
import { Asset, Portfolio } from '@prisma/client';

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

	createPortfolio: async (name: string): Promise<Portfolio> => {
		try {
			return (await apiInstance.post<Portfolio>(apiRoutes.PORTFOLIOS, { name })).data
		} catch (error) {
			throw handleApiError(error, 'createPortfolio')
		}
	},

	selectPortfolio: async (id: number): Promise<Portfolio> => {
		try {
			return (await apiInstance.patch<Portfolio>(`${apiRoutes.PORTFOLIOS}/${id}/select`, { isActive: true })).data
		} catch (error) {
			throw handleApiError(error, 'selectPortfolio')
		}
	},

	editPortfolio: async (id: number, name: string): Promise<Portfolio> => {
		try {
			return (await apiInstance.patch<Portfolio>(`${apiRoutes.PORTFOLIOS}/${id}/edit`, { name })).data
		} catch (error) {
			throw handleApiError(error, 'editPortfolio')
		}
	},


	deletePortfolio: async (id: number): Promise<void> => {
		try {
			await apiInstance.delete<void>(`${apiRoutes.PORTFOLIOS}/${id}`)
		} catch (error) {
			throw handleApiError(error, 'deletePortfolio')
		}
	},

	addAsset: async (id: number, selectedAsset: Asset, quantity: number, buyPrice: number): Promise<Portfolio> => {
		try {
			return (await apiInstance.post<Portfolio>(`${apiRoutes.PORTFOLIOS}/${id}/assets`, { selectedAsset, quantity, buyPrice })).data
		} catch (error) {
			throw handleApiError(error, 'addAsset')
		}
	},
}