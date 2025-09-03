import { NextRequest, NextResponse } from 'next/server';
import { calculateAssetMetrics, getExchangeRate, withAuth } from '@/lib';
import { prisma } from '@/prisma/prisma-client';

export const PATCH = withAuth(async (req: NextRequest, userId: number, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> => {
	try {

		const { id } = await params
		const portfolioId = Number(id)
		const { currency: toCurrency }: { currency: string } = await req.json()

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId },
			include: { portfolioAssets: { include: { asset: true, }, }, },
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 400 })
		}

		if (!toCurrency) {
			return NextResponse.json({ message: 'Portfolio currency is required' }, { status: 400 })
		}

		const fromCurrency = portfolio.currency

		if (fromCurrency === toCurrency) {
			await prisma.portfolio.update({
				where: { id: portfolioId, userId },
				data: { currency: toCurrency }
			})

			return NextResponse.json({ message: `Portfolio currency changed from ${fromCurrency} to ${toCurrency} successfully` }, { status: 200 })
		}

		const exchangeRate = await getExchangeRate(fromCurrency, toCurrency)

		await prisma.$transaction(async (tx) => {
			await tx.portfolio.update({
				where: { id: portfolioId, userId },
				data: { currency: toCurrency }
			})

			for (const portfolioAsset of portfolio.portfolioAssets) {

				let currentPrice: number

				if (portfolioAsset.currentPrice !== null && portfolioAsset.currentPrice !== undefined) {
					currentPrice = portfolioAsset.currentPrice
				} else if (portfolioAsset.asset && portfolioAsset.asset?.price !== null) {
					currentPrice = portfolioAsset.asset.price / 100
				} else {
					currentPrice = portfolioAsset.buyPrice
				}

				const convertedBuyPrice = portfolioAsset.buyPrice * exchangeRate
				const convertedCurrentPrice = currentPrice * exchangeRate

				const metrics = calculateAssetMetrics(portfolioAsset.quantity, convertedBuyPrice, convertedCurrentPrice)

				await tx.portfolioAsset.update({
					where: { id: portfolioAsset.id },
					data: {
						buyPrice: parseFloat(convertedBuyPrice.toFixed(2)),
						currentPrice: parseFloat(convertedCurrentPrice.toFixed(2)),
						totalInvested: metrics.totalInvested,
						totalWorth: metrics.totalWorth,
						gain: metrics.gain,
						gainAfterFees: metrics.gainAfterFees,
						percentage: metrics.percentage,
					}
				})
			}
		})

		return NextResponse.json({ message: `Portfolio currency changed from ${fromCurrency} to ${toCurrency} successfully` }, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_CHANGE_PATCH] Server error:', error)
		return NextResponse.json({ message: 'Failed to change portfolio currency' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
})