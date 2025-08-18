import { prisma } from '@/prisma/prisma-client';
import { Portfolio } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(async (req: NextRequest, userId:number): Promise<NextResponse<Portfolio[] | { message: string }>> => {
	try {
		const portfolios = await prisma.portfolio.findMany({
			where: { userId },
			orderBy: { id: 'asc' }
		})
		return NextResponse.json(portfolios, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIOS_GET] Server error:', error)
		return NextResponse.json({ message: 'Failed to fetch portfolios' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
})

export const POST = withAuth(async (req: NextRequest, userId: number): Promise<NextResponse<{ message: string }>> => {
  	try {
		const { name }: { name: string } = await req.json()
		
		if (!name) {
			return NextResponse.json({ message: 'Portfolio name is required' }, { status: 400 })
		}

		await prisma.portfolio.create({
			data: {	
				name,
				user: { connect: { id: userId } }
				// isActive: false, // Значение по умолчанию
			}
		})
		return NextResponse.json({ message: 'Portfolio created successfully' }, { status: 200 })
	} catch (error) {
		console.error('[PORTFOLIO_POST] Server error:', error)
		return NextResponse.json({ message: 'Failed to create portfolio' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
})