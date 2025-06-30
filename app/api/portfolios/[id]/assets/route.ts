import { prisma } from '@/prisma/prisma-client';
import { Asset, PortfolioAsset } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { selectedAsset, quantity, buyPrice }: { selectedAsset: Asset, quantity: string, buyPrice: string } = await req.json()

		// Проверяем существование портфолио
		const portfolio = await prisma.portfolio.findUnique({
			where: { id: Number(params.id) }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 404 })
		}

		// Проверка существования ассета
		const asset = await prisma.asset.findUnique({
			where: { id: selectedAsset.id }
		})

		if (!asset) {
			return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
		}

		// Поиск существующей записи PortfolioAsset
		const existingAsset = await prisma.portfolioAsset.findFirst({
			where: {
				portfolioId: portfolio.id,
				assetId: selectedAsset.id,
			}
		});

		let portfolioAsset: PortfolioAsset;

		if (existingAsset) {
			// Обновление существующей записи
			portfolioAsset = await prisma.portfolioAsset.update({
				where: { id: existingAsset.id },
				data: {
					quantity: {
						increment: parseInt(quantity)
					},
					buyPrice: {
						increment: parseInt(buyPrice), // Можно добавить логику расчета средней цены
					},
					updatedAt: new Date()
				},
				include: {
					Portfolio: true,
					asset: true
				}
			});
		} else {
			// Создание новой записи
			portfolioAsset = await prisma.portfolioAsset.create({
				data: {
					quantity: parseInt(quantity),
					buyPrice: parseInt(buyPrice),
					portfolioId: portfolio.id,
					assetId: selectedAsset.id,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				include: {
					Portfolio: true,
					asset: true
				}
			});
		}

		return NextResponse.json(portfolioAsset, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_ASSETS_POST] Server error:', error)
		return NextResponse.json({ message: 'Failed to add asset' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}