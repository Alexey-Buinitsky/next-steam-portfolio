import { BanknoteArrowDownIcon, BanknoteArrowUpIcon, BanknoteIcon, LucideProps } from 'lucide-react';
import { calculateMetrics, formatCurrency } from '@/lib';
import { PortfolioAsset } from '@prisma/client';

type TrendType = "up" | "down" | "neutral";

export interface IMetric {
	key: string;
	value: string;
	trend: TrendType;
	icon: React.ComponentType<LucideProps>
}

const getTrendIcon = (trend: TrendType): React.ComponentType<LucideProps> => {
	const icons = { up: BanknoteArrowUpIcon, down: BanknoteArrowDownIcon, neutral: BanknoteIcon, }
	return icons[trend];
}

export const getMetrics = (portfolioAssets: PortfolioAsset[] | undefined): IMetric[] => {
	const { totalInvested, totalWorth, gain, estimatedGainAfterFees } = calculateMetrics(portfolioAssets)

	const determineTrend = (value: number, compareTo?: number): TrendType => {
		if (compareTo !== undefined) { return value >= compareTo ? "up" : "down" }
		return value >= 0 ? "up" : "down"
	}

	const metricsData: IMetric[] = [
		{ key: "Total Invested", value: formatCurrency(totalInvested), trend: "neutral", icon: getTrendIcon("neutral"), },
		{ key: "Total Worth", value: formatCurrency(totalWorth), trend: determineTrend(totalWorth, totalInvested), icon: getTrendIcon(determineTrend(totalWorth, totalInvested)) },
		{ key: "Gain", value: formatCurrency(gain), trend: determineTrend(gain), icon: getTrendIcon(determineTrend(gain)), },
		{ key: "Estimated gain after fees", value: formatCurrency(estimatedGainAfterFees), trend: determineTrend(estimatedGainAfterFees), icon: getTrendIcon(determineTrend(estimatedGainAfterFees)), }
	]

	return metricsData
}