import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // const id = params.id;
    // const id = context.params.id;
    const { id } = await params; //временное решение добавить await
    
    const portfolioAssets = await prisma.portfolioAsset.findMany({
      where: { portfolioId: Number(id) },
      include: {
        asset: {
          select: {
            id: true,
            imageUrl: true,
            name: true,
            type: true,
            price: true
          }
        }
      }
    });
    
    return NextResponse.json(portfolioAssets);
  } catch (error) {
    console.error('Error fetching portfolio assets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio assets' },
      { status: 500 }
    );
  }
}