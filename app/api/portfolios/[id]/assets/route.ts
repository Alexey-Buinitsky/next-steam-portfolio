import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { Asset, PortfolioAsset } from '@prisma/client';

interface Props {
	selectedAsset: Asset;
	quantity: string;
	buyPrice: string;
	totalInvested: number;
	totalWorth: number;
	percentage: number;
	gain: number;
	gainAfterFees: number;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<PortfolioAsset[] | { message: string }>> {
	try {

		const portfolioId = Number(params.id)

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 404 })
		}

		const portfolioAssets = await prisma.portfolioAsset.findMany({
			where: { portfolioId },
			include: { asset: true },
			orderBy: { id: 'asc' },
		})

		return NextResponse.json(portfolioAssets, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_ASSETS_GET] Server error:', error)
		return NextResponse.json({ message: 'Failed to fetch portfolio assets' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> {
	try {

		const portfolioId = Number(params.id)
		const data: Props = await req.json()

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 404 })
		}

		await prisma.portfolioAsset.create({
			data: {
				portfolio: {
					connect: { id: portfolioId }
				},
				asset: {
					connect: { id: Number(data.selectedAsset.id) }
				},
				quantity: Number(data.quantity),
				buyPrice: Number(data.buyPrice),
				totalInvested: Number(data.totalInvested),
				totalWorth: Number(data.totalWorth),
				percentage: Number(data.percentage),
				gain: Number(data.gain),
				gainAfterFees: Number(data.gainAfterFees),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			include: {
				portfolio: true,
				asset: true,
			},
		})

		return NextResponse.json({ message: 'Portfolio Asset added successfully' }, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_ASSETS_POST] Server error:', error)
		return NextResponse.json({ message: 'Failed to add asset' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}