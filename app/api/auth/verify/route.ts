//app/api/auth/verify-email
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getIronSession } from 'iron-session';
import { sessionOptions, verifyEmailVerificationCode, authLimiter, validateDataWithSchema, verifyEmailSchema } from '@/lib';

import type { IronSessionWithUser } from '@/lib/session';

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const identifier = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'; 

  const { success, limit, reset, remaining } = await authLimiter.limit(identifier);
    if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return NextResponse.json(
      { 
        error: `Too many verification attempts. Please try again in ${retryAfter} seconds.` 
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

  
  const response = new NextResponse();

  try {
    const json = await request.json()
    const validation = validateDataWithSchema(verifyEmailSchema, json)
    if (!validation.isValid) {
        return NextResponse.json(
        { error: validation.error},
        { status: 400 }
      );
    }

    const { userId, code } = validation.data;

    // 1. Проверка кода
    const verification = await verifyEmailVerificationCode(userId, code);
    if (!verification.success) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

   
    // 2. Активация пользователя
    const user = await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
      select: {
        id: true,
        email: true,
        nickname: true
      }
    });

    // 3. Создание сессии
    const session = await getIronSession<IronSessionWithUser>(
      request,
      response,
      sessionOptions
    );

    session.user = {
      id: user.id,
      email: user.email,
      nickname: user.nickname || undefined
    };

    await session.save();

    // 4. Возвращаем успешный ответ с пользователем
    const successResponse = NextResponse.json(
      { 
        success: true, 
        user: session.user
      },
      { headers: response.headers }
    );

    successResponse.headers.set('X-RateLimit-Limit', limit.toString());
    successResponse.headers.set('X-RateLimit-Remaining', remaining.toString());
    successResponse.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());

    return successResponse
    
  } catch (error) {
    console.error('Full verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error during verification' },
      { status: 500 }
    );
  }
}