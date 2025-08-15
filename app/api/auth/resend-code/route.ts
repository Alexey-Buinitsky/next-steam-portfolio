import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma-client';
import { sendVerificationEmail } from "@/lib";

export async function POST(request: NextRequest) {
    const { userId, email } = await request.json()

    try {
        const user = await prisma.user.findUnique({ 
            where: { id: userId, email} 
        })
        
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        if (user.emailVerified) {
            return NextResponse.json(
                { error: 'Email already verified' },
                { status: 400 }
            );
        }

        // Отправляем код повторно
        await sendVerificationEmail({ userId, email });

        return NextResponse.json({
            success: true,
            message: 'Verification code resent',
        });
    } catch (error) {
        console.error('Resend code error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}