import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { verifyPasswordResetCode, hashPassword, invalidatePasswordResetCode, authLimiter, validateDataWithSchema, resetPasswordSchema, userIdCommonSchema } from '@/lib';

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const identifier = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'; 
  const { success, limit, reset, remaining } = await authLimiter.limit(identifier);
    if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return NextResponse.json(
      { 
        error: `Too many password reset attempts. Please try again in ${retryAfter} seconds.` 
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
    // 1. ВАЛИДАЦИЯ 1: Данные от пользователя (code, password, confirmPassword)
    const json = await request.json()

    const validation = validateDataWithSchema(resetPasswordSchema, json)
    if (!validation.isValid) {
        return NextResponse.json(
          { error: validation.error },
          { status: 400 }
        );
    }
    const { code, password } = validation.data;

    // ВАЛИДАЦИЯ 2: т.к. userId нет в схеме (после валидации исчезает из validation) - отдельно провалидируем userId
    const userIdValidation = validateDataWithSchema(userIdCommonSchema, json.userId);
    if (!userIdValidation.isValid) {
      console.error('Invalid userId received:', json.userId);
      return NextResponse.json(
        { error: userIdValidation.error },
        { status: 400 }
      );
    }
    const userId = userIdValidation.data; // <- Безопасное число

    // 2. Проверяем код через Redis
    const verification = await verifyPasswordResetCode(userId, code);
    if (!verification.success) {
      return NextResponse.json(
        { error: 'Invalid or expired reset code' },
        { status: 400 }
      );
    }

    // Обновляем пароль
    const hashedPassword = await hashPassword(password);
    
    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: hashedPassword,
      },
    });

    // ИНВАЛИДИРУЕМ КОД ПОСЛЕ УСПЕШНОГО СБРОСА
    await invalidatePasswordResetCode(userId);

    const successResponse = NextResponse.json(
      { 
        success: true, 
        message: 'Password has been reset successfully',
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
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}