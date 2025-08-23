import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma-client';
import { sendVerificationEmail } from "@/lib";
import { authLimiter } from "@/lib";

export async function POST(request: NextRequest) {
    // RATE LIMIT - ПРОВЕРЯЕМ ЛИМИТ ПЕРЕД ВСЕМ ОСТАЛЬНЫМ 
    const forwardedFor = request.headers.get('x-forwarded-for'); //получим с vercel
    const identifier = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'; // при dev режиме используем 127.0.0.1 - дальше можно использовать только forwardedFor.split(',')[0].trim()
    
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
    // RATE LIMIT
    
    
    try {
        const { userId, email } = await request.json()

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