import { apiInstance } from './api-instance';
import { apiRoutes } from './api-routes';
import { handleApiError } from './api-error';
import { Asset } from '@prisma/client';
import { PortfolioAssetWithRelations } from '@/types/portfolio';

export const portfolioAssetsApi = {

	fetch: async (id: number): Promise<PortfolioAssetWithRelations[]> => {
		try {
			return (await apiInstance.get<PortfolioAssetWithRelations[]>(`${apiRoutes.PORTFOLIOS}/${id}/assets`)).data
		} catch (error) {
			throw handleApiError(error, 'fetchPortfolioAssets')
		}
	},

	create: async (id: number, selectedAsset: Asset, quantity: number, buyPrice: number): Promise<{ message: string }> => {
		try {
			return (await apiInstance.post<{ message: string }>(`${apiRoutes.PORTFOLIOS}/${id}/assets`, { selectedAsset, quantity, buyPrice },)).data
		} catch (error) {
			throw handleApiError(error, 'createPortfolioAsset')
		}
	},

	edit: async (id: number, selectedPortfolioAsset: PortfolioAssetWithRelations, quantity: number, buyPrice: number): Promise<{ message: string }> => {
		try {
			return (await apiInstance.patch<{ message: string }>(`${apiRoutes.PORTFOLIOS}/${id}/assets`, { selectedPortfolioAsset, quantity, buyPrice })).data
		} catch (error) {
			throw handleApiError(error, 'editPortfolioAsset')
		}
	},

	delete: async (id: number, selectedPortfolioAssets: PortfolioAssetWithRelations[]): Promise<{ message: string }> => {
		try {
			return (await apiInstance.delete<{ message: string }>(`${apiRoutes.PORTFOLIOS}/${id}/assets`, { data: { selectedPortfolioAssets } })).data
		} catch (error) {
			throw handleApiError(error, 'deletePortfolioAsset')
		}
	},
}