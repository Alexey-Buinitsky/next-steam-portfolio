import { calculateFee, calculatePercentage } from '@/lib';

interface ReturnProps {
	totalInvested: number;
	totalWorth: number;
	percentage: number;
	gain: number;
	gainAfterFees: number;
}

export const calculateAssetMetrics = (quantity: number, buyPrice: number, currentPrice: number): ReturnProps => {

	const totalInvested = parseFloat((buyPrice * quantity).toFixed(2))
	const totalWorth = parseFloat((currentPrice * quantity).toFixed(2))
	const percentage = parseFloat(calculatePercentage(currentPrice, buyPrice).toFixed(2))
	const gain = parseFloat((totalWorth - totalInvested).toFixed(2))

	const fee5Percent = parseFloat(calculateFee(totalWorth, 23).toFixed(2))
	const fee10Percent = parseFloat(calculateFee(totalWorth, 11.5).toFixed(2))
	const gainAfterFees = parseFloat((gain - fee5Percent - fee10Percent).toFixed(2))

	return { totalInvested, totalWorth, percentage, gain, gainAfterFees }
}