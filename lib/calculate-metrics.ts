import { PortfolioAsset } from "@prisma/client"

interface ReturnProps {
	totalInvested: number,
	totalWorth: number,
	gain: number,
	estimatedGainAfterFees: number,
}

export const calculateMetrics = (portfolioAssets: PortfolioAsset[] | undefined): ReturnProps => {

	const initialValues = { totalInvested: 0, totalWorth: 0, gain: 0, estimatedGainAfterFees: 0, }

	if (!portfolioAssets?.length) { return initialValues }

	return portfolioAssets.reduce((acc, asset) => ({
		totalInvested: acc.totalInvested + (asset.totalInvested || 0),
		totalWorth: acc.totalWorth + (asset.totalWorth || 0),
		gain: acc.gain + (asset.gain || 0),
		estimatedGainAfterFees: acc.estimatedGainAfterFees + (asset.gainAfterFees || 0),
	}), initialValues)
}