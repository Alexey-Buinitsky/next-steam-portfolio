import { calculateFee, calculatePercentage } from '@/lib';
import { PortfolioAssetWithRelations } from '@/types/portfolio';
import { Asset, PortfolioAsset } from '@prisma/client';

interface ReturnProps {
	totalInvested: number;
	totalWorth: number;
	percentage: number;
	gain: number;
	gainAfterFees: number;
}

export const calculateAssetMetrics = (asset: Asset | PortfolioAssetWithRelations | PortfolioAsset & { asset: Asset | null }, quantity: number, buyPrice: number, currentPrice?: number,): ReturnProps => {

	let calculatedCurrentPrice: number

	if (currentPrice !== undefined) {
		calculatedCurrentPrice = currentPrice
	} else if ('price' in asset && asset.price !== null) {
		calculatedCurrentPrice = asset.price / 100
	} else if ('asset' in asset && asset.asset && asset.asset.price !== null) {
		calculatedCurrentPrice = asset.asset.price / 100
	} else {
		calculatedCurrentPrice = buyPrice
	}

	const totalInvested = parseFloat((buyPrice * quantity).toFixed(2))
	const totalWorth = parseFloat((calculatedCurrentPrice * quantity).toFixed(2))
	const percentage = parseFloat(calculatePercentage(calculatedCurrentPrice, buyPrice).toFixed(2))
	const gain = parseFloat((totalWorth - totalInvested).toFixed(2))

	const fee5Percent = parseFloat(calculateFee(totalWorth, 23).toFixed(2))
	const fee10Percent = parseFloat(calculateFee(totalWorth, 11.5).toFixed(2))
	const gainAfterFees = parseFloat((gain - fee5Percent - fee10Percent).toFixed(2))

	return { totalInvested, totalWorth, percentage, gain, gainAfterFees }
}