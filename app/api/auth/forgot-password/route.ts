import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { sendPasswordResetEmail, strictAuthLimiter, validateDataWithSchema, forgotPasswordSchema} from '@/lib';

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for'); 
  const identifier = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  const { success, limit, reset, remaining } = await strictAuthLimiter.limit(identifier);
    if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return NextResponse.json(
      { 
        error: `Too many password reset requests. Please try again in ${retryAfter} seconds.` 
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
    const validation = validateDataWithSchema(forgotPasswordSchema, json);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // В целях безопасности не сообщаем, что пользователь не существует
      const successResponse = NextResponse.json({
        success: true,
        message: 'If the email exists, a password reset code has been sent',
      });

      successResponse.headers.set('X-RateLimit-Limit', limit.toString());
      successResponse.headers.set('X-RateLimit-Remaining', remaining.toString());
      successResponse.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());
      return successResponse;
    }

    // Отправляем email с кодом сброса
    await sendPasswordResetEmail({ 
      userId: user.id, 
      email: user.email 
    });

    const successResponse = NextResponse.json(
      { 
        success: true, 
        message: 'If the email exists, a password reset code has been sent',
        userId: user.id,
      },
      {
        status: 200
      }
    );

    successResponse.headers.set('X-RateLimit-Limit', limit.toString());
    successResponse.headers.set('X-RateLimit-Remaining', remaining.toString());
    successResponse.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());

    return successResponse;

  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}