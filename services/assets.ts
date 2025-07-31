import { apiInstance } from './api-instance';
import { apiRoutes } from './api-routes';
import { handleApiError } from './api-error';
import { Asset } from '@prisma/client';

export interface AssetsApiSearchResponse {
	assets: Asset[];
	hasMore: boolean;
}

export const assetsApi = {

	search: async (query: string, skip: number, take: number): Promise<AssetsApiSearchResponse> => {
		try {
			return (await apiInstance.get<AssetsApiSearchResponse>(`${apiRoutes.ASSETS}/search`, { params: { query, skip, take } })).data
		} catch (error) {
			throw handleApiError(error, 'searchAssets')
		}
	},
}