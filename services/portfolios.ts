import { apiInstance } from './api-instance';
import { apiRoutes } from './api-routes';
import { Portfolio } from '@prisma/client';

const handleApiError = (error: unknown, context: string) => {
	console.error(`[${context}] Error:`, error);
	throw new Error(`Failed to ${context.toLowerCase()}`);
}

export const portfoliosApi = {

  fetchAll: async (): Promise<Portfolio[]> => {
    try {
      return (await apiInstance.get<Portfolio[]>(apiRoutes.PORTFOLIOS)).data
    } catch (error) {
      throw handleApiError(error, 'fetchPortfolios')
    }
  },

  create: async (name: string): Promise<Portfolio> => {
    try {
      return (await apiInstance.post<Portfolio>(apiRoutes.PORTFOLIOS, { name })).data
    } catch (error) {
      throw handleApiError(error, 'createPortfolio')
    }
  },

  select: async (id: number): Promise<Portfolio> => {
    try {
      return (await apiInstance.patch<Portfolio>(`${apiRoutes.PORTFOLIOS}/${id}/select`, { isActive: true })).data
    } catch (error) {
      throw handleApiError(error, 'selectPortfolio')
    }
  },

  edit: async (id: number, name: string): Promise<Portfolio> => {
    try {
      return (await apiInstance.patch<Portfolio>(`${apiRoutes.PORTFOLIOS}/${id}/edit`, { name } )).data
    } catch (error) {
      throw handleApiError(error, 'editPortfolio')
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await apiInstance.delete(`${apiRoutes.PORTFOLIOS}/${id}`)
    } catch (error) {
      throw handleApiError(error, 'deletePortfolio')
    }
  }
}