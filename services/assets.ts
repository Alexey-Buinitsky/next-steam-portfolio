import { apiInstance } from './api-instance';
import { apiRoutes } from './api-routes';
import { Asset } from '@prisma/client';

export interface AssetsApiSearchResponse {
	assets: Asset[];
	hasMore: boolean;
}

const handleApiError = (error: unknown, context: string) => {
	console.error(`[${context}] Error:`, error)
	throw new Error(`Failed to ${context.toLowerCase()}`)
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