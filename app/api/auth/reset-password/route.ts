import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { verifyPasswordResetCode, hashPassword, invalidatePasswordResetCode, validateDataWithSchema, withAuthRateLimit } from '@/lib';
import { resetPasswordSchema, userIdCommonSchema } from '@/form';

export const POST = withAuthRateLimit(resetPasswordHandler)

async function resetPasswordHandler({ json }: { request: NextRequest, json?: unknown }) {
  if (!json) {
    return NextResponse.json(
      { error: 'Request body is required' },
      { status: 400 }
    );
  }
  
  // 1. ВАЛИДАЦИЯ 1: Данные от пользователя (code, password, confirmPassword)
  const validation = validateDataWithSchema(resetPasswordSchema, json)
  if (!validation.isValid) {
    return NextResponse.json(
      { error: validation.error },
      { status: 400 }
    );
  }
  const { code, password } = validation.data;

  // ВАЛИДАЦИЯ 2: т.к. userId нет в схеме (после валидации исчезает из validation) - отдельно провалидируем userId
  const userIdValidation = validateDataWithSchema(userIdCommonSchema, (json as any).userId);
  if (!userIdValidation.isValid) {
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
      { 
        error: 'Invalid or expired reset code',
        code: 'INVALID_RESET_CODE' // ← ДОБАВЛЯЕМ КОД
      },
      { status: 400 }
    );
  }

  // Обновляем пароль
  const hashedPassword = await hashPassword(password);
  
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: hashedPassword },
  });

  // ИНВАЛИДИРУЕМ КОД ПОСЛЕ УСПЕШНОГО СБРОСА
  await invalidatePasswordResetCode(userId);

  return NextResponse.json(
    { success: true, message: 'Password has been reset successfully'},
    { status: 200 }
  );
}