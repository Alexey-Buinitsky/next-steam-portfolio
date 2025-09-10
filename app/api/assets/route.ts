import { NextRequest, NextResponse } from 'next/server';
import { calculateAssetMetrics } from '@/lib';
import { exchangeRateApi } from '@/services/exchange-rate';
import { prisma } from '@/prisma/prisma-client';
import { SteamMarketItem } from '@/types/steam';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url)

		const page = parseInt(searchParams.get('page') || '1')
		const perPage = parseInt(searchParams.get('perPage') || '10')
		const query = searchParams.get('query') || undefined
		const isInfinite = searchParams.get('infinite') === 'true'

		const where = { isActive: true, ...(query && { name: { contains: query, mode: 'insensitive' as const, }, }), }

		const skip = (page - 1) * perPage

		let take = perPage
		if (isInfinite) take = perPage + 1

		const [assets, totalCount] = await Promise.all([
			prisma.asset.findMany({ where, skip, take, orderBy: { volume: 'desc' }, }),
			isInfinite ? Promise.resolve(0) : prisma.asset.count({ where }),
		])

		let resultAssets = assets
		let hasMore = false

		if (isInfinite) {
			hasMore = assets.length > perPage
			resultAssets = hasMore ? assets.slice(0, perPage) : assets
		} else {
			hasMore = page < Math.ceil(totalCount / perPage)
		}

		return NextResponse.json(
			{ assets: resultAssets, pagination: { currentPage: page, totalPages: isInfinite ? 0 : Math.ceil(totalCount / perPage), totalCount: isInfinite ? 0 : totalCount, perPage, hasMore, }, },
			{ status: 200 })
	} catch (error) {
		console.error('[ASSETS_GET] Server error:', error)
		return NextResponse.json({ message: 'Failed to fetch assets' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}

export async function POST(req: NextRequest) {
	try {
		const assets: SteamMarketItem[] = await req.json()

		if (!assets || !Array.isArray(assets)) {
			return NextResponse.json({ message: 'Valid assets data is required' }, { status: 400 })
		}

		await prisma.$transaction(async (tx) => {
			for (const asset of assets) {
				const existingAsset = await tx.asset.findUnique({ where: { name: asset.name } })

				const newPrice = asset.sell_price || 0
				const isPriceChanged = existingAsset && existingAsset.price !== newPrice

				await tx.asset.upsert({
					where: { name: asset.name },
					update: {
						price: asset.sell_price || 0,
						volume: asset.sell_listings || 0,
						updatedAt: new Date(),
						isActive: true,
						isSync: !isPriceChanged,
					},
					create: {
						name: asset.name || '',
						price: asset.sell_price || 0,
						volume: asset.sell_listings || 0,
						type: asset.asset_description?.type || 'unknown',
						imageUrl: asset.asset_description?.icon_url || '',
						isActive: true,
						isSync: false,
						createdAt: new Date(),
						updatedAt: new Date(),
					}
				})
			}
		})

		return NextResponse.json({ message: 'Assets synced successfully' }, { status: 200 })
	} catch (error) {
		console.error('[ASSETS_POST] Server error:', error)
		return NextResponse.json({ message: 'Failed to sync assets' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const assetsToSync = await prisma.asset.findMany({
			where: { isSync: false },
			include: { portfolioAssets: { include: { portfolio: true } } }
		})

		if (assetsToSync.length === 0) {
			return NextResponse.json({ message: 'Asset prices synced successfully' }, { status: 200 })
		}

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
				const rates = await exchangeRateApi.fetch('USD', currency)
				exchangeRates.set(currency, rates[currency])
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

		return NextResponse.json({ message: 'Asset prices synced successfully' }, { status: 200 })
	} catch (error) {
		console.error('[ASSETS_PRICES_PATCH] Server error:', error)
		return NextResponse.json({ message: 'Failed to sync asset prices' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}