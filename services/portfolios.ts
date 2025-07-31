import { apiInstance } from './api-instance';
import { apiRoutes } from './api-routes';
import { handleApiError } from './api-error';
import { Portfolio } from '@prisma/client';

export const portfoliosApi = {

	fetch: async (): Promise<Portfolio[]> => {
		try {
			return (await apiInstance.get<Portfolio[]>(apiRoutes.PORTFOLIOS)).data
		} catch (error) {
			throw handleApiError(error, 'fetchPortfolios')
		}
	},

	create: async (name: string): Promise<{ message: string }> => {
		try {
			return (await apiInstance.post<{ message: string }>(apiRoutes.PORTFOLIOS, { name })).data
		} 
		catch (error) {
			throw handleApiError(error, 'createPortfolio')
		}
	},

	select: async (id: number): Promise<{ message: string }> => {
		try {
			return (await apiInstance.patch<{ message: string }>(`${apiRoutes.PORTFOLIOS}/${id}/select`, { isActive: true })).data
		} catch (error) {
			throw handleApiError(error, 'selectPortfolio')
		}
	},

	edit: async (id: number, name: string): Promise<{ message: string }> => {
		try {
			return (await apiInstance.patch<{ message: string }>(`${apiRoutes.PORTFOLIOS}/${id}/edit`, { name })).data
		} catch (error) {
			throw handleApiError(error, 'editPortfolio')
		}
	},

	delete: async (id: number): Promise<{ message: string }> => {
		try {
			return (await apiInstance.delete<{ message: string }>(`${apiRoutes.PORTFOLIOS}/${id}`)).data
		} catch (error) {
			throw handleApiError(error, 'deletePortfolio')
		}
	},
}