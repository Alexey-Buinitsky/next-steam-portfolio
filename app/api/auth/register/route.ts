//app/api/auth/register
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { sendVerificationEmail, hashPassword, validateDataWithSchema, registerSchema, withStrictAuthRateLimit } from '@/lib';

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
    
    if(!existingUser.emailVerified) { // Случай когда пользователь заново регистрируется из-за неподтвержденного кода

      await prisma.user.update({      // Если в форме данных вдруг что-то поменялось
        where: { id: existingUser.id },
        data: {
          passwordHash: await hashPassword(password),
          nickname: nickname || null,
          // другие поля при необходимости
        }
      });

      await sendVerificationEmail({
        userId: existingUser.id,
        email: existingUser.email
      })

      return NextResponse.json({
        success: true,
        userId: existingUser.id,
        email: existingUser.email,
        message: 'New verification code sent',
        isExisting: true, // Флаг что это существующий неподтвержденный пользователь
      });
    }

    return NextResponse.json(
      { error: 'User with this email already exists' },
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

  // 3. Отправляем код верификации
  
    await sendVerificationEmail({
      userId: user.id,
      email: user.email,
    });

    return NextResponse.json(
      { 
        success: true, 
        userId: user.id,
        email: user.email,
        message: 'Verification code sent',
      },
      {
        status: 200
      }
    );
}