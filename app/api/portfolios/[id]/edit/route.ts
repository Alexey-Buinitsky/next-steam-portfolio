import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {

	try {
		const { name }: { name: string } = await req.json()

		const editedPortfolio = await prisma.portfolio.update({
			where: { id: Number(params.id) },
			data: { name: name.trim() },
		})

		return NextResponse.json(editedPortfolio)
	}
	catch (error) {
		console.error('[PORTFOLIO_EDIT_PATCH] Server error:', error)
		return NextResponse.json({ message: 'Failed to edit portfolio' }, { status: 500 })
	}
	finally {
		await prisma.$disconnect()
	}
}