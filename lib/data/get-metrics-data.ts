import { calculatePortfolioMetrics, calculateGainPercentage, formatCurrency, formatValue } from '@/lib';
import { PortfolioAsset } from '@prisma/client';

export interface IMetricData {
	key: string;
	rawValue: number;
	formattedValue: string;
	percentage?: number;
}

export const getMetricsData = (portfolioAssets: PortfolioAsset[] | undefined, currency: string = 'USD'): IMetricData[] => {
	const { totalInvested, totalWorth, gain, estimatedGainAfterFees } = calculatePortfolioMetrics(portfolioAssets)

	const metricsData: IMetricData[] = [
		{ key: "Total Invested", rawValue: totalInvested, formattedValue: formatCurrency(totalInvested, currency) },
		{ key: "Total Worth", rawValue: totalWorth, formattedValue: formatCurrency(totalWorth, currency) },
		{ key: "Gain", rawValue: gain, formattedValue: formatValue(gain, "currency", currency), percentage: calculateGainPercentage(gain, totalInvested) },
		{ key: "Estimated gain after fees", rawValue: estimatedGainAfterFees, formattedValue: formatValue(estimatedGainAfterFees, "currency", currency), percentage: calculateGainPercentage(estimatedGainAfterFees, totalInvested) }
	]

	return metricsData
}