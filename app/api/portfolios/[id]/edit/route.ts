import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> {
	try {

		const { id } = await params
		const portfolioId = Number(id)
		const { name }: { name: string } = await req.json()

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 400 })
		}

		if (!name) {
			return NextResponse.json({ message: 'Portfolio name is required' }, { status: 400 })
		}

		await prisma.portfolio.update({
			where: { id: portfolioId },
			data: { name },
		})

		return NextResponse.json({ message: 'Portfolio edited successfully' }, { status: 200 })
	}
	catch (error) {
		console.error('[PORTFOLIO_EDIT_PATCH] Server error:', error)
		return NextResponse.json({ message: 'Failed to edit portfolio' }, { status: 500 })
	}
	finally {
		await prisma.$disconnect()
	}
}