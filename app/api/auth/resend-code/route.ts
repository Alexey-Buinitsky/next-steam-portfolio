import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma-client';
import { sendVerificationEmail, validateDataWithSchema, resendCodeSchema, withAuthRateLimit } from "@/lib";

export const POST = withAuthRateLimit(resendCodeHandler)

async function resendCodeHandler({ json }: {request: NextRequest, json?: unknown}) {
    if (!json) {
        return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
        );
    }
    
    const validation = validateDataWithSchema(resendCodeSchema, json)
    if (!validation.isValid) {
        return NextResponse.json(
            { error: validation.error },
            { status: 400 }
        );
    }

    const { userId, email } = validation.data

    const user = await prisma.user.findUnique({ 
        where: { id: userId, email} 
    })
    
    if (!user) {
        return NextResponse.json(
            { 
                error: 'User not found',
                code: 'USER_NOT_FOUND'
            },
            { status: 404 }
        );
    }

    if (user.emailVerified) {
        return NextResponse.json(
            { 
                error: 'Email already verified',
                code: 'EMAIL_ALREADY_VERIFIED' 
            },
            { status: 400 }
        );
    }

    // Отправляем код повторно
    await sendVerificationEmail({ userId, email });

    return NextResponse.json({ 
        success: true, 
        message: 'Verification code sent',
    })
}