import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { verifyPasswordResetCode, hashPassword, invalidatePasswordResetCode } from '@/lib';
import { authLimiter } from '@/lib';

export async function POST(request: NextRequest) {
  // RATE LIMIT - ПРОВЕРЯЕМ ЛИМИТ ПЕРЕД ВСЕМ ОСТАЛЬНЫМ 
  const forwardedFor = request.headers.get('x-forwarded-for'); //получим с vercel
  const identifier = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'; // при dev режиме используем 127.0.0.1 - дальше можно использовать только forwardedFor.split(',')[0].trim()

  const { success, limit, reset, remaining } = await authLimiter.limit(identifier);
    if (!success) {
    // Если лимит исчерпан, сразу возвращаем ошибку
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return NextResponse.json(
      { 
        error: `Too many password reset attempts. Please try again in ${retryAfter} seconds.` 
      },
      { 
        status: 429,
        headers: {
          // Устанавливаем стандартные заголовки для лимита
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
    const { userId, code, password } = await request.json();

    // // СОБИРАЕМ ВСЕ ОШИБКИ В КУЧУ
    // let errors = [];
    // if (!userId) errors.push('Reset-password:  Reset-password: User ID is required');
    // if (!code) errors.push('Reset-password:  Verification code is required');
    // if (userId && typeof userId !== 'number') errors.push('Reset-password:  User ID must be a number');
    // if (code && typeof code !== 'string') errors.push('Reset-password:  Verification code must be a string'); // временное логирование - убрать после dev 

    // // ЕСЛИ ЕСТЬ ОШИБКИ - ВОЗВРАЩАЕМ ИХ
    // if (errors.length > 0) {
    //   return NextResponse.json(
    //     { error: 'Invalid input data', details: errors },
    //     { status: 400 }
    //   );
    // }

    // Проверяем код через Redis
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