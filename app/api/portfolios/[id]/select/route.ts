import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/withAuth';

export const PATCH = withAuth(async(req: NextRequest, userId: number, { params }: { params: { id: string} }): Promise<NextResponse<{ message: string }>> => {
	try {
		const portfolioId = Number(params.id)
		const { isActive }: { isActive: boolean} = await req.json()

		const portfolio = await prisma.portfolio.findUnique({
			where: { id: portfolioId, userId }
		});

		if (!portfolio) return NextResponse.json({ message: 'Portfolio not found or access denied' }, { status: 404 })

		await prisma.$transaction(async () => {
			// Если пытаемся установить то же состояние - просто возвращаем
			if (portfolio.isActive === isActive) return;

			// Если активируем портфель - деактивируем другие
			if (isActive) {
				await prisma.portfolio.updateMany({
					where: 	{ isActive: true,  userId },
					data: { isActive: false }
				})
			}

			// Обновляем текущий портфель
			await prisma.portfolio.update({
				where: {id: portfolioId, userId },
				data: { isActive }
			})
		})

		return NextResponse.json({ message: 'Portfolio selected successfuly'}, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_SELECT_PATCH] Server error:', error)
		return NextResponse.json({ message: 'Failed to select portfolio'}, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
})