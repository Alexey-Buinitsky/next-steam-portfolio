import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams
		const query = searchParams.get('query') || ''
		const skip = parseInt(searchParams.get('skip') || '0')
		const take = parseInt(searchParams.get('take') || '10')

		const assets = await prisma.asset.findMany({
			where: { name: { contains: query, mode: 'insensitive' }, },
			orderBy: { volume: 'desc' },
			skip,
			take: take + 1,
		})

		const hasMore = assets.length > take
		const result = hasMore ? assets.slice(0, take) : assets

		return NextResponse.json({ assets: result, hasMore }, { status: 200 })
	} catch (error) {
		console.error('[ASSETS_SEARCH_GET] Error:', error)
		return NextResponse.json({ message: 'Failed to search assets' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}