import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

const INSENSITIVE_MODE = 'insensitive' as const
const DESC_ORDER = 'desc' as const

const CATEGORY_CONFIG = {
	cases: {
		whereClause: {
			type: {
				contains: 'Base Grade Container',
				mode: INSENSITIVE_MODE,
			},
			name: {
				contains: 'case',
				mode: INSENSITIVE_MODE,
			},
			isActive: true,
			volume: { not: null, gt: 0 },
		}
	},
	weapons: {
		whereClause: {
			OR: [
				{ name: { contains: 'AK-47', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'AWP', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'M4A4', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'M4A1-S', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'AUG', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'SG 553', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'USP-S', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'Glock-18', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'Desert Eagle', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'Galil AR', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'FAMAS', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'MP9', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'MP7', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'P250', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'G3SG1', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'XM1014', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'P90', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'Zeus x27', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'M249', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'UMP-45', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'SSG 08', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'Five-SeveN', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'R8 Revolver', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'P2000', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'MP5-SD', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'Sawed-Off', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'MAC-10', mode: INSENSITIVE_MODE } },
				{ name: { contains: 'Negev', mode: INSENSITIVE_MODE } },
			],
			isActive: true,
			volume: { not: null, gt: 0 },
			NOT: {
				OR: [
					{ name: { contains: 'case', mode: INSENSITIVE_MODE } },
					{ name: { contains: 'sticker', mode: INSENSITIVE_MODE } },
					{ name: { contains: 'container', mode: INSENSITIVE_MODE } },
				]
			}
		}
	},
	stickers: {
		whereClause: {
			type: {
				contains: 'Sticker',
				mode: INSENSITIVE_MODE,
			},
			name: {
				contains: 'Sticker',
				mode: INSENSITIVE_MODE,
			},
			isActive: true,
			volume: { not: null, gt: 0 },
			NOT: {
				OR: [
					{ name: { contains: 'case', mode: INSENSITIVE_MODE } },
					{ name: { contains: 'container', mode: INSENSITIVE_MODE } },
				]
			}
		}
	}
}

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url)
		const category = searchParams.get('category') as keyof typeof CATEGORY_CONFIG
		const limit = parseInt(searchParams.get('limit') || '20')

		if (!category) {
			return NextResponse.json({ error: 'Valid category parameter is required. Available: cases, weapons, stickers' }, { status: 400 })
		}

		const assets = await prisma.asset.findMany({
			where: CATEGORY_CONFIG[category].whereClause,
			orderBy: { volume: DESC_ORDER, },
			take: limit,
		})

		return NextResponse.json(assets, { status: 200 })
	} catch (error) {
		console.error('[ASSETS_POPULAR_GET] Server error:', error)
		return NextResponse.json({ error: 'Failed to fetch popular assets' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}