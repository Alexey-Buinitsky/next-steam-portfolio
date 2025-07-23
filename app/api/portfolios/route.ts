import { prisma } from '@/prisma/prisma-client';
import { Portfolio } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<Portfolio[] | { message: string }>> {
	try {
		const portfolios = await prisma.portfolio.findMany({
			orderBy: [{ id: 'asc', },],
		})
		return NextResponse.json(portfolios, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIOS_GET] Server error:', error)
		return NextResponse.json({ message: 'Failed to fetch portfolios' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}

export async function POST(req: Request): Promise<NextResponse<{ message: string }>> {
	try {
		const { name }: { name: string } = await req.json()
		await prisma.portfolio.create({
			data: {
				name,
				// isActive: false, // Значение по умолчанию
				// userId: null // Если не требуется привязка к пользователю
			}
		})
		return NextResponse.json({ message: 'Portfolio created successfully' }, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_POST] Server error:', error)
		return NextResponse.json({ message: 'Failed to create portfolio' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}