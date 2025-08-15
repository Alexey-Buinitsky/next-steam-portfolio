//app/api/auth/verify
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getIronSession } from 'iron-session';
import { verifyEmailVerificationCode, sessionOptions } from '@/lib';

import type { IronSessionWithUser } from '@/lib/session';

export async function POST(request: NextRequest) {
  const { userId, code } = await request.json();

  const response = new NextResponse();

  // 1. Проверка кода
  const verification = await verifyEmailVerificationCode(userId, code);
  if (!verification.success) {
    return NextResponse.json(
      { error: 'Invalid verification code' },
      { status: 400 }
    );
  }

   try {
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
     return NextResponse.json(
      { success: true, user: session.user },
      { headers: response.headers }
    );
    
  } catch (error) {
    console.error('Full verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error during verification' },
      { status: 500 }
    );
  }
}