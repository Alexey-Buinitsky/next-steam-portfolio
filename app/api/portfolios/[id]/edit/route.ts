import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> {
	try {

		const portfolioId = Number(params.id)
		const { name }: { name: string } = await req.json()

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