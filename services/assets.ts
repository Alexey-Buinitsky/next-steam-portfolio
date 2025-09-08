import { apiInstance } from './api-instance';
import { apiRoutes } from './api-routes';
import { handleApiError } from './api-error';
import { Asset } from '@prisma/client';
import { SteamMarketItem } from '@/types/steam';

export interface AssetsApiSearchResponse {
	assets: Asset[];
	hasMore: boolean;
}

export const assetsApi = {

	search: async (query: string, skip: number, take: number): Promise<AssetsApiSearchResponse> => {
		try {
			return (await apiInstance.get<AssetsApiSearchResponse>(`${apiRoutes.ASSETS}`, { params: { query, skip, take } })).data
		} catch (error) {
			throw handleApiError(error, 'searchAssets')
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