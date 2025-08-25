//app/api/auth/register
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { sendVerificationEmail, hashPassword, strictAuthLimiter, validateDataWithSchema, registerSchema } from '@/lib';

export async function POST(request: NextRequest) {
  // RATE LIMIT - ПРОВЕРЯЕМ ЛИМИТ ПЕРЕД ВСЕМ ОСТАЛЬНЫМ 
  const forwardedFor = request.headers.get('x-forwarded-for'); //получим с vercel
  const identifier = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'; // при dev режиме используем 127.0.0.1 - дальше можно использовать только forwardedFor.split(',')[0].trim()

  const { success, limit, reset, remaining } = await strictAuthLimiter.limit(identifier);
    if (!success) {
    // Если лимит исчерпан, сразу возвращаем ошибку
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return NextResponse.json(
      { 
        error: `Too many registartion attempts. Please try again in ${retryAfter} seconds.` 
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


  let user

  try {
  const json = await request.json()

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


      const successResponse = NextResponse.json({
        success: true,
        userId: existingUser.id,
        email: existingUser.email,
        message: 'New verification code sent',
        isExisting: true, // Флаг что это существующий неподтвержденный пользователь
      });

      successResponse.headers.set('X-RateLimit-Limit', limit.toString());
      successResponse.headers.set('X-RateLimit-Remaining', remaining.toString());
      successResponse.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());

      return successResponse;
    }

    return NextResponse.json(
      { error: 'User with this email already exists' },
      { status: 400 }
    );
  }

  // 2. Создаем временного пользователя
  user = await prisma.user.create({
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

    const successResponse = NextResponse.json(
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

    successResponse.headers.set('X-RateLimit-Limit', limit.toString());
    successResponse.headers.set('X-RateLimit-Remaining', remaining.toString());
    successResponse.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());

    return successResponse;

  } catch (error) {
    // Откатываем создание пользователя при ошибке
    if (user && user.id) {
      // Пытаемся удалить пользователя, если он был создан
      await prisma.user.delete({ where: { id: user.id } }).catch(console.error);
    }
    
    return NextResponse.json(
      { error: 'Failed to send verification email. Please try again.' },
      { status: 500 }
    );
  }
}