import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string }>> {
	try {

		const portfolioId = Number(params.id)
		const { isActive }: { isActive: boolean } = await req.json()

		// Используем транзакцию для атомарности
		await prisma.$transaction(async () => {
			const portfolio = await prisma.portfolio.findUnique({
				where: { id: portfolioId },
			})

			// Если пытаемся установить то же состояние - просто возвращаем
			if (portfolio?.isActive === isActive) {
				return portfolio
			}

			// Если активируем портфель - деактивируем другие
			if (isActive) {
				await prisma.portfolio.updateMany({
					where: { isActive: true },
					data: { isActive: false },
				})
			}

			// Обновляем текущий портфель
			return await prisma.portfolio.update({
				where: { id: portfolioId },
				data: { isActive },
			})
		})

		return NextResponse.json({ message: 'Portfolio selected successfully' }, { status: 200 })
	}
	catch (error) {
		console.error('[PORTFOLIO_SELECT_PATCH] Server error:', error)
		return NextResponse.json({ message: 'Failed to select portfolio' }, { status: 500 })
	}
	finally {
		await prisma.$disconnect()
	}
}