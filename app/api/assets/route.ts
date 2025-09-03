import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { SteamMarketItem } from '@/types/steam';

export async function GET() {
	try {
		const assets = await prisma.asset.findMany({ orderBy: { createdAt: 'desc' }, })
		return NextResponse.json(assets)
	} catch (error) {
		console.error('[ASSETS_GET] Error:', error)
		return NextResponse.json({ message: 'Failed to fetch assets' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}

export async function POST(req: NextRequest) {
	try {
		const assets: SteamMarketItem[] = await req.json()

		if (!assets || !Array.isArray(assets)) {
			return NextResponse.json({ error: 'Valid assets data is required' }, { status: 400 })
		}

		await prisma.$transaction(async (tx) => {
			for (const asset of assets) {
				const existingAsset = await tx.asset.findUnique({ where: { name: asset.name } })

				const newPrice = asset.sell_price || 0
				const priceChanged = existingAsset && existingAsset.price !== newPrice

				await tx.asset.upsert({
					where: { name: asset.name },
					update: {
						price: asset.sell_price || 0,
						volume: asset.sell_listings || 0,
						updatedAt: new Date(),
						isActive: true,
						isSync: !priceChanged,
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