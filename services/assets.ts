import { apiInstance } from './api-instance';
import { apiRoutes } from './api-routes';
import { handleApiError } from './api-error';
import { AssetsResponse } from '@/types/portfolio';
import { SteamMarketItem } from '@/types/steam';

export const assetsApi = {

	fetch: async (page: number, perPage: number, query?: string, isInfinite?: boolean): Promise<AssetsResponse> => {
		try {
			return (await apiInstance.get<AssetsResponse>(`${apiRoutes.ASSETS}`, { params: { page, perPage, query, isInfinite } })).data
		} catch (error) {
			throw handleApiError(error, 'fetchAssets')
		}
	},

	sync: async (items: SteamMarketItem[]): Promise<void> => {
		try {
			return await apiInstance.post(`${apiRoutes.ASSETS}`, items)
		} catch (error) {
			throw handleApiError(error, 'syncAssets')
		}
	},

	update: async (): Promise<void> => {
		try {
			return await apiInstance.patch(`${apiRoutes.ASSETS}`)
		} catch (error) {
			throw handleApiError(error, 'updateAssets')
		}
	},
}