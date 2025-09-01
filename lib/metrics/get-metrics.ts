import { calculateGainPercentage, formatValue } from '@/lib';
import { calculateMetrics } from '@/lib/metrics';
import { PortfolioAsset } from '@prisma/client';

export interface IMetric {
	key: string;
	value: string;
	percentage?: number;
}

export const getMetrics = (portfolioAssets: PortfolioAsset[] | undefined, currency: string = 'USD'): IMetric[] => {
	const { totalInvested, totalWorth, gain, estimatedGainAfterFees } = calculateMetrics(portfolioAssets)

	const metricsData: IMetric[] = [
		{ key: "Total Invested", value: formatValue(totalInvested, "currency", currency) },
		{ key: "Total Worth", value: formatValue(totalWorth, "currency", currency) },
		{ key: "Gain", value: formatValue(gain, "currency", currency), percentage: calculateGainPercentage(gain, totalInvested) },
		{ key: "Estimated gain after fees", value: formatValue(estimatedGainAfterFees, "currency", currency), percentage: calculateGainPercentage(estimatedGainAfterFees, totalInvested) }
	]

	return metricsData
}