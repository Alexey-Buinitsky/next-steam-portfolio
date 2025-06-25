import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const { portfolioId, assetId, quantity, buyPrice } = body

        const result = await prisma.portfolioAsset.create({
            data: {
                portfolioId,
                assetId,
                quantity,
                buyPrice
            }
        })

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error adding asset to portfolio:', error);
        return NextResponse.json(
        { error: 'Failed to add asset to portfolio' },
        { status: 500 }
    );
  }
}