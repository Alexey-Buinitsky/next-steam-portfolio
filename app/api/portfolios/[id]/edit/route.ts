import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/withAuth';

export const PATCH = withAuth(async(req: NextRequest, userId: number, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> => {
	try {
		const portfolioId = Number(params.id)
		const { name }: { name: string } = await req.json() 

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId, userId }
		});

		if (!portfolio) return NextResponse.json({ message: 'Portfolio not found or access denied' }, { status: 404 })

		await prisma.portfolio.update({
			where: {id: portfolioId, userId},
			data: { name }
		})
		
		return NextResponse.json({ message: 'Portfolio edited successfuly'}, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_EDIT_PATCH] Server error:', error)
		return NextResponse.json({ message: 'Failed to edit portfolio' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
})