import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> {
	try {

		const { id } = await params
    const portfolioId = Number(id)

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 400 })
		}

		await prisma.portfolio.delete({
			where: { id: portfolioId }
		})

		return NextResponse.json({ message: 'Portfolio deleted successfully' }, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_DELETE] Server error:', error)
		return NextResponse.json({ message: 'Failed to delete portfolio' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}