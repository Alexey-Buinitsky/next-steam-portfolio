import { LucideProps } from 'lucide-react';
import { formatCurrency } from '@/lib';
import { calculateMetrics, getTrendIcon, TrendType } from '@/lib/metrics';
import { PortfolioAsset } from '@prisma/client';

export interface IMetric {
	key: string;
	value: string;
	trend: TrendType;
	icon: React.ComponentType<LucideProps>
}

export const getMetrics = (portfolioAssets: PortfolioAsset[] | undefined): IMetric[] => {
	const { totalInvested, totalWorth, gain, estimatedGainAfterFees } = calculateMetrics(portfolioAssets)

	const determineTrend = (value: number, compareTo?: number): TrendType => {
		if (compareTo !== undefined) {
			if (value > compareTo) return "up"
			if (value < compareTo) return "down"
			return "neutral"
		} else {
			if (value > 0) return "up"
			if (value < 0) return "down"
			return "neutral"
		}
	}

	const metricsData: IMetric[] = [
		{ key: "Total Invested", value: formatCurrency(totalInvested), trend: "neutral", icon: getTrendIcon("neutral"), },
		{ key: "Total Worth", value: formatCurrency(totalWorth), trend: determineTrend(totalWorth, totalInvested), icon: getTrendIcon(determineTrend(totalWorth, totalInvested)) },
		{ key: "Gain", value: formatCurrency(gain), trend: determineTrend(gain), icon: getTrendIcon(determineTrend(gain)), },
		{ key: "Estimated gain after fees", value: formatCurrency(estimatedGainAfterFees), trend: determineTrend(estimatedGainAfterFees), icon: getTrendIcon(determineTrend(estimatedGainAfterFees)), }
	]

	return metricsData
}