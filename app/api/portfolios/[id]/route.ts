import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

	try {
		// Проверяем существование портфолио
		const portfolio = await prisma.portfolio.findUnique({
			where: { id: Number(params.id) }
		})

		if (!portfolio) {
			return NextResponse.json({ message: 'Portfolio not found' }, { status: 404 })
		}

		// Удаляем портфолио
		await prisma.portfolio.delete({
			where: { id: Number(params.id) }
		})

		return NextResponse.json({ message: 'Portfolio deleted successfully' })
	} catch (error) {
		console.error('[PORTFOLIO_DELETE] Server error:', error)
		return NextResponse.json({ message: 'Failed to delete portfolio' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}