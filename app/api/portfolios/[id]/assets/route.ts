import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { Asset, PortfolioAsset } from '@prisma/client';
import { PortfolioAssetWithRelations } from '@/types/portfolio';

interface Props {
	selectedAsset?: Asset;
	selectedPortfolioAsset?: PortfolioAssetWithRelations;
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

		const { id } = await params
    const portfolioId = Number(id)

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 400 })
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

		const { id } = await params
    const portfolioId = Number(id)
		const data: Props = await req.json()

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 400 })
		}

		if (!data.selectedAsset || !data.selectedAsset.id) {
			return NextResponse.json({ message: 'Asset is required' }, { status: 400 })
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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> {
	try {

		const { id } = await params
    const portfolioId = Number(id)
		const data: Props = await req.json()

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 400 })
		}

		if (!data.selectedPortfolioAsset || !data.selectedPortfolioAsset.id) {
			return NextResponse.json({ message: 'Portfolio asset is required' }, { status: 400 })
		}

		await prisma.portfolioAsset.update({
			where: {
				id: data.selectedPortfolioAsset.id,
				portfolioId: portfolioId,
			},
			data: {
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
		})

		return NextResponse.json({ message: 'Portfolio asset edited successfully' }, { status: 200 })
	}
	catch (error) {
		console.error('[PORTFOLIO_ASSET_PATCH] Server error:', error)
		return NextResponse.json({ message: 'Failed to edit portfolio asset' }, { status: 500 })
	}
	finally {
		await prisma.$disconnect()
	}
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> {
	try {

		const { id } = await params
    const portfolioId = Number(id)
		const { selectedPortfolioAssets }: { selectedPortfolioAssets: PortfolioAssetWithRelations[] } = await req.json()

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 400 })
		}

		if (!selectedPortfolioAssets || !selectedPortfolioAssets.length) {
			return NextResponse.json({ message: 'Portfolio asset(s) is(are) required' }, { status: 400 })
		}

		await prisma.portfolioAsset.deleteMany({
			where: {
				id: {
					in: selectedPortfolioAssets.map(portfolioAsset => portfolioAsset.id)
				},
				portfolioId: portfolioId
			}
		})

		return NextResponse.json({ message: 'Portfolio asset(s) deleted successfully' }, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_ASSET_DELETE] Server error:', error)
		return NextResponse.json({ message: 'Failed to delete portfolio asset(s)' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}