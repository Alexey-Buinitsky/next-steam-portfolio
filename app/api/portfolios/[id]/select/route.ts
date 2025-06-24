import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { isActive }: { isActive: boolean } = await req.json()

		// Используем транзакцию для атомарности
		const result = await prisma.$transaction(async () => {
			const portfolio = await prisma.portfolio.findUnique({
				where: { id: Number(params.id) },
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
				where: { id: Number(params.id) },
				data: { isActive },
			})
		})

		return NextResponse.json(result)
	}
	catch (error) {
		console.error('[PORTFOLIO_SELECT_PATCH] Server error:', error)
		return NextResponse.json({ message: 'Failed to select portfolio' }, { status: 500 })
	}
	finally {
		await prisma.$disconnect()
	}
}