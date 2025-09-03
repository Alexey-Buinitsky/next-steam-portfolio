import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('perPage') || '10')
    const search = searchParams.get('search') || undefined
    const type = searchParams.get('type') || undefined

    const skip = (page - 1) * perPage

    const where = {
      isActive: true,
      ...(type && { type }),
      ...(search && {
        name: {
          contains: search,
          mode: 'insensitive' as const, // as const - фиксирует тип литерала ('insensitive (регистронезависимый поиск)' вместо string)
        },
      }),
    }

    const [assets, totalCount] = await Promise.all([
      prisma.asset.findMany({
        where,
        skip,
        take: perPage,
      }),
      prisma.asset.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / perPage)

    return NextResponse.json({
      assets,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        perPage,
      },
    })
  } catch (error) {
    console.error('Error fetching assets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assets' },
      { status: 500 }
    )
  }
}