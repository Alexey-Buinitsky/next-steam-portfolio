import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib';
import { prisma } from '@/prisma/prisma-client';

export const PATCH = withAuth(async (req: NextRequest, userId: number, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> => {
	try {
		const { id } = await params
		const portfolioId = Number(id)
		const { isActive }: { isActive: boolean } = await req.json()

		await prisma.$transaction(async () => {
			const portfolio = await prisma.portfolio.findUnique({
				where: { id: portfolioId },
			})

			if (!portfolio) {
				return NextResponse.json({ message: 'Portfolio not found' }, { status: 400 })
			}

			if (typeof isActive !== 'boolean') {
				return NextResponse.json({ message: 'Valid isActive flag is required' }, { status: 400 })
			}

			if (portfolio.isActive === isActive) {
				return portfolio
			}

			if (isActive) {
				await prisma.portfolio.updateMany({
					where: { isActive: true, userId },
					data: { isActive: false }
				})
			}

			await prisma.portfolio.update({
				where: { id: portfolioId, userId },
				data: { isActive }
			})
		})

		return NextResponse.json({ message: 'Portfolio selected successfuly' }, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_SELECT_PATCH] Server error:', error)
		return NextResponse.json({ message: 'Failed to select portfolio' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
})