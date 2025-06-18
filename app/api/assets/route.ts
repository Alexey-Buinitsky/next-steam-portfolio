import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const assets = await prisma.asset.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(assets);
  } catch (error) {
    console.error('[ASSETS_GET] Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch assets' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}