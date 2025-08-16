//app/api/auth/register
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { sendVerificationEmail, hashPassword } from '@/lib';

export async function POST(request: NextRequest) {
  const { email, password, nickname } = await request.json();

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
      })
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
  try {
    await sendVerificationEmail({
      userId: user.id,
      email: user.email,
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      email: user.email,
      message: 'Verification code sent',
    });
  } catch (error) {
    // Откатываем создание пользователя при ошибке
    await prisma.user.delete({ where: { id: user.id } });
    
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}