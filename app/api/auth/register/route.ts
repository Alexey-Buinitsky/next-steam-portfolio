//app/api/auth/register
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { sendVerificationEmail, hashPassword, validateDataWithSchema, withStrictAuthRateLimit } from '@/lib';
import { registerSchema } from '@/form';

export const POST = withStrictAuthRateLimit(registerHandler)

async function registerHandler({ json }: { request: NextRequest, json?: unknown }) {
   if (!json) {
    return NextResponse.json(
      { error: 'Request body is required' },
      { status: 400 }
    );
  }

  // ВАЛИДИРУЕМ ДАННЫЕ ПЕРЕД ОБРАБОТКОЙ
  const validation = validateDataWithSchema(registerSchema, json);
  if (!validation.isValid) {
    return NextResponse.json(
      { error: validation.error },
      { status: 400 }
    );
  }

  // Если валидация прошла, используем проверенные данные!
  const { email, password, nickname } = validation.data;

  // 1. Проверка существующего пользователя
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) { 
    return NextResponse.json(
      {  
        error: 'User with this email already exists',
        code: 'EMAIL_ALREADY_EXISTS'
      },
      { status: 400 }
    );
  }

  // 2. Создаем временного пользователя
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword(password),
      nickname: nickname || undefined,
      emailVerified: false, // Помечаем как неподтверждённый
    },
  });

  // 3. Отправляем код верификации - RESEND РЕАЛИЗАЦИЯ
  // await sendVerificationEmail({
  //   userId: user.id,
  //   email: user.email,
  // });

  // ВОЗВРАЩАЕМ КОД В ОТВЕТЕ ВМЕСТО ОТПРАВКИ EMAIL - ВМЕСТО RESEND
  const verificationCode = await sendVerificationEmail({
    userId: user.id,
    email: user.email,
  });

  return NextResponse.json(
    { 
      success: true, 
      userId: user.id,
      email: user.email,
      message: 'Verification code sent',

      verificationCode: verificationCode, // ДОБАВЛЯЕМ КОД В ОТВЕТ - ВМЕСТО RESEND
    },
    { status: 200 }
  );
}