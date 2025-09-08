import { NextRequest, NextResponse } from 'next/server';
import { calculateAssetMetrics, withAuth } from '@/lib';
import { exchangeRateApi } from '@/services/exchange-rate';
import { prisma } from '@/prisma/prisma-client';
import { Asset, PortfolioAsset } from '@prisma/client';
import { PortfolioAssetWithRelations } from '@/types/portfolio';

interface Props {
	selectedAsset?: Asset;
	selectedPortfolioAsset?: PortfolioAssetWithRelations;
	quantity: string;
	buyPrice: string;
}

export const GET = withAuth(async (req: NextRequest, userId: number, { params }: { params: { id: string } }): Promise<NextResponse<PortfolioAsset[] | { message: string }>> => {
	try {
		const { id } = await params
		const portfolioId = Number(id)

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId, userId }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 400 })
		}

		const portfolioAsset = await prisma.portfolioAsset.findMany({
			where: { portfolioId },
			include: { asset: true, portfolio: true },
			orderBy: { id: 'asc' }
		})

		return NextResponse.json(portfolioAsset, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_ASSETS_GET] Server error:', error)
		return NextResponse.json({ message: 'Failed to fetch portfolio assets' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
})

export const POST = withAuth(async (req: NextRequest, userId: number, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> => {
	try {
		const { id } = await params
		const portfolioId = Number(id)
		const data: Props = await req.json()

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId, userId },
			select: { currency: true }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 400 })
		}

		if (!data.selectedAsset || !data.selectedAsset.id) {
			return NextResponse.json({ message: 'Asset is required' }, { status: 400 })
		}

		const selectedAsset = await prisma.asset.findUnique({
			where: { id: data.selectedAsset.id }
		})

		if (!selectedAsset) {
			return NextResponse.json({ message: 'Asset not found' }, { status: 400 })
		}

		let currentPrice = selectedAsset.price !== null ? selectedAsset.price / 100 : Number(data.buyPrice)

		if (portfolio.currency !== 'USD') {
			const exchangeRates = await exchangeRateApi.fetch('USD', portfolio.currency)
			currentPrice = currentPrice * exchangeRates[portfolio.currency]
		}

		const metrics = calculateAssetMetrics(Number(data.quantity), Number(data.buyPrice), currentPrice)

		await prisma.portfolioAsset.create({
			data: {
				portfolio: {
					connect: { id: portfolioId }
				},
				asset: {
					connect: { id: Number(data.selectedAsset.id) }
				},
				quantity: Number(data.quantity),
				buyPrice: parseFloat(Number(data.buyPrice).toFixed(2)),
				currentPrice: parseFloat(currentPrice.toFixed(2)),
				totalInvested: metrics.totalInvested,
				totalWorth: metrics.totalWorth,
				percentage: metrics.percentage,
				gain: metrics.gain,
				gainAfterFees: metrics.gainAfterFees,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		})

		return NextResponse.json({ message: 'Portfolio asset added successfuly' }, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_ASSETS_POST] Server error:', error)
		return NextResponse.json({ message: 'Failed to add asset' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
})

export const PATCH = withAuth(async (req: NextRequest, userId: number, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> => {
	try {
		const { id } = await params
		const portfolioId = Number(id)
		const data: Props = await req.json()

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId, userId }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 400 })
		}

		if (!data.selectedPortfolioAsset || !data.selectedPortfolioAsset.id) {
			return NextResponse.json({ message: 'Portfolio asset is required' }, { status: 400 })
		}

		const currentPrice = data.selectedPortfolioAsset.currentPrice !== null ? data.selectedPortfolioAsset.currentPrice : data.selectedPortfolioAsset.asset?.price ? data.selectedPortfolioAsset.asset.price / 100 : Number(data.buyPrice)

		const metrics = calculateAssetMetrics(Number(data.quantity), Number(data.buyPrice), currentPrice)

		await prisma.portfolioAsset.update({
			where: {
				id: data.selectedPortfolioAsset.id,
				portfolio: { id: portfolioId, userId }
			},
			data: {
				quantity: Number(data.quantity),
				buyPrice: parseFloat(Number(data.buyPrice).toFixed(2)),
				totalInvested: metrics.totalInvested,
				totalWorth: metrics.totalWorth,
				percentage: metrics.percentage,
				gain: metrics.gain,
				gainAfterFees: metrics.gainAfterFees,
				updatedAt: new Date(),
			}
		})

		return NextResponse.json({ message: 'Portfolio asset edited successfuly' }, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_ASSET_PATCH] Server error:', error)
		return NextResponse.json({ message: 'Failed to edit portfolio asset' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
})

export const DELETE = withAuth(async (req: NextRequest, userId: number, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> => {
	try {
		const { id } = await params
		const portfolioId = Number(id)
		const { selectedPortfolioAssets }: { selectedPortfolioAssets: PortfolioAssetWithRelations[] } = await req.json()

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId, userId }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 400 })
		}

		if (!selectedPortfolioAssets || !selectedPortfolioAssets.length) {
			const message = selectedPortfolioAssets.length === 0 ? 'Portfolio assets are required' : 'Portfolio asset is required'
			return NextResponse.json({ message: message }, { status: 400 })
		}

		await prisma.portfolioAsset.deleteMany({
			where: {
				id: { in: selectedPortfolioAssets.map(portfolioAsset => portfolioAsset.id) },
				portfolio: { id: portfolioId, userId }
			}
		})

		const message = selectedPortfolioAssets.length === 1 ? 'Portfolio asset deleted successfully' : 'Portfolio assets deleted successfully'
		return NextResponse.json({ message: message }, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_ASSET_DELETE] Server error:', error)
		const { selectedPortfolioAssets }: { selectedPortfolioAssets: PortfolioAssetWithRelations[] } = await req.json()
		const message = selectedPortfolioAssets.length === 1 ? 'Failed to delete portfolio asset' : 'Failed to delete portfolio assets'
		return NextResponse.json({ message: message }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
})