import { apiInstance } from './api-instance';
import { apiRoutes } from './api-routes';
import { calculateFee, calculatePercentage } from '@/lib';
import { Asset } from '@prisma/client';
import { PortfolioAssetWithRelations } from '@/types/portfolio';

interface ReturnProps {
	totalInvested: number,
	totalWorth: number,
	percentage: number,
	gain: number,
	gainAfterFees: number,
}

const calculateAssetMetrics = (asset: Asset | PortfolioAssetWithRelations, quantity: number, buyPrice: number): ReturnProps => {
	let currentPrice: number
  
  if ('price' in asset) {
    currentPrice = asset.price !== null ? asset.price / 100 : buyPrice
  } else {
    currentPrice = asset.asset.price !== null ? asset.asset.price / 100 : buyPrice
  }
	
	const totalInvested = buyPrice * quantity
	const totalWorth = currentPrice * quantity
	const percentage = calculatePercentage(currentPrice, buyPrice)
	const gain = totalWorth - totalInvested

	const fee5Percent = calculateFee(totalWorth, 23)
	const fee10Percent = calculateFee(totalWorth, 11.5)
	const gainAfterFees = gain - fee5Percent - fee10Percent

	return { totalInvested, totalWorth, percentage, gain, gainAfterFees, }
}

const handleApiError = (error: unknown, context: string) => {
	console.error(`[${context}] Error:`, error)
	throw new Error(`Failed to ${context.toLowerCase()}`)
}

export const portfolioAssetsApi = {

	fetch: async (id: number): Promise<PortfolioAssetWithRelations[]> => {
		try {
			return (await apiInstance.get<PortfolioAssetWithRelations[]>(`${apiRoutes.PORTFOLIOS}/${id}/assets`)).data
		} catch (error) {
			throw handleApiError(error, 'fetchAssets')
		}
	},

	create: async (id: number, selectedAsset: Asset, quantity: number, buyPrice: number): Promise<{ message: string }> => {
		try {
			const metrics = calculateAssetMetrics(selectedAsset, quantity, buyPrice)
			return (await apiInstance.post<{ message: string }>(`${apiRoutes.PORTFOLIOS}/${id}/assets`, { selectedAsset, quantity, buyPrice, ...metrics },)).data
		} catch (error) {
			throw handleApiError(error, 'createPortfolioAsset')
		}
	},

	edit: async (id: number, selectedPortfolioAsset: PortfolioAssetWithRelations, quantity: number, buyPrice: number): Promise<{ message: string }> => {
		try {
			const metrics = calculateAssetMetrics(selectedPortfolioAsset, quantity, buyPrice)
			return (await apiInstance.patch<{ message: string }>(`${apiRoutes.PORTFOLIOS}/${id}/assets`, { selectedPortfolioAsset, quantity, buyPrice, ...metrics })).data
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