import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { verifyPasswordResetCode, hashPassword, invalidatePasswordResetCode } from '@/lib';

export async function POST(request: NextRequest) {
  try {
    const { userId, code, password } = await request.json();

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

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully',
    });
    
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}