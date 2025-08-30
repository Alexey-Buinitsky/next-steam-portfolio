import { prisma } from '@/prisma/prisma-client';
import { calculateAssetMetrics, getExchangeRate } from '@/lib';

export const syncAssetPrices = async () => {
	try {
		const assetsToSync = await prisma.asset.findMany({
			where: { isSync: false },
			include: { portfolioAssets: { include: { portfolio: true } } }
		})

		if (assetsToSync.length === 0) return

		const exchangeRates = new Map<string, number>()
		const currencies = new Set<string>()

		for (const asset of assetsToSync) {
			for (const portfolioAsset of asset.portfolioAssets) {
				if (portfolioAsset.portfolio && portfolioAsset.portfolio.currency !== 'USD') {
					currencies.add(portfolioAsset.portfolio.currency)
				}
			}
		}

		for (const currency of currencies) {
			try {
				const rate = await getExchangeRate('USD', currency)
				exchangeRates.set(currency, rate)
			} catch (error) {
				console.error(`Failed to get exchange rate for ${currency}:`, error)
				exchangeRates.set(currency, 1)
			}
		}

		for (const asset of assetsToSync) {
			if (!asset.price) continue

			const currentPriceUSD = asset.price / 100

			for (const portfolioAsset of asset.portfolioAssets) {

				if (!portfolioAsset.portfolio) continue

				try {
					let currentPrice = currentPriceUSD

					if (portfolioAsset.portfolio.currency !== 'USD') {
						const exchangeRate = exchangeRates.get(portfolioAsset.portfolio.currency) || 1
						currentPrice = currentPriceUSD * exchangeRate
					}

					const metrics = calculateAssetMetrics(portfolioAsset.quantity, portfolioAsset.buyPrice, currentPrice)

					await prisma.portfolioAsset.update({
						where: { id: portfolioAsset.id },
						data: {
							currentPrice: parseFloat(currentPrice.toFixed(2)),
							totalWorth: metrics.totalWorth,
							percentage: metrics.percentage,
							gain: metrics.gain,
							gainAfterFees: metrics.gainAfterFees,
							updatedAt: new Date(),
						}
					})
				} catch (error) {
					console.error(`Failed to update portfolio asset ${portfolioAsset.id}:`, error)
				}
			}

			await prisma.asset.update({
				where: { id: asset.id },
				data: { isSync: true }
			})
		}
	} catch (error) {
		console.error('Asset price synchronization failed:', error)
		throw error
	}
}