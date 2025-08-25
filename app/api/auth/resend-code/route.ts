import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma-client';
import { sendVerificationEmail, authLimiter, validateDataWithSchema, resendCodeSchema } from "@/lib";

export async function POST(request: NextRequest) {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const identifier = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    const { success, limit, reset, remaining } = await authLimiter.limit(identifier);
        if (!success) {
        const now = Date.now();
        const retryAfter = Math.floor((reset - now) / 1000);
        return NextResponse.json(
        { 
            error: `Too many attempts to resend code. Please try again in ${retryAfter} seconds.` 
        },
        { 
            status: 429,
            headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
            }
        }
        );
    }

    
    try {
        const json = await request.json()
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

         const successResponse = NextResponse.json({ 
            success: true, 
            message: 'Verification code sent',
        })

        successResponse.headers.set('X-RateLimit-Limit', limit.toString());
        successResponse.headers.set('X-RateLimit-Remaining', remaining.toString());
        successResponse.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());

        return successResponse;

    } catch (error) {
        console.error('Resend code error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}