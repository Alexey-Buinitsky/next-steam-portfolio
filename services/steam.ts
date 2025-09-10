import { apiInstance } from './api-instance';
import { apiRoutes } from './api-routes';
import { handleApiError } from './api-error';
import { SteamMarketResponse } from '@/types/steam';

export const steamApi = {

	fetch: async (start: number, count: number): Promise<SteamMarketResponse> => {
		try {
			const response = (await apiInstance.get<SteamMarketResponse>(`${apiRoutes.STEAM}`, { params: { start, count } })).data

			if (!response || typeof response !== 'object') {
				throw new Error('Invalid Steam API response format')
			}

			if (response.success !== true) {
				throw new Error('Steam API request failed')
			}

			if (!Array.isArray(response.results)) {
				throw new Error('Invalid results array in Steam API response')
			}

			return response
		} catch (error) {
			throw handleApiError(error, 'fetchSteam')
		}
	},
}