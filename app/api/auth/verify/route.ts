//app/api/auth/verify-email
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getIronSession } from 'iron-session';
import { sessionOptions, verifyEmailVerificationCode, validateDataWithSchema, withAuthRateLimit } from '@/lib';
import { verifyEmailSchema } from '@/form';

import type { IronSessionWithUser } from '@/lib';

export const POST = withAuthRateLimit(verify)

async function verify({ request, json }: { request: NextRequest, json?: unknown}) {
  if (!json) {
    return NextResponse.json(
      { error: 'Request body is required' },
      { status: 400 }
    );
  }
  
  const response = new NextResponse();

  const validation = validateDataWithSchema(verifyEmailSchema, json)
  if (!validation.isValid) {
      return NextResponse.json(
      { error: validation.error},
      { status: 400 }
    );
  }

  const { userId, code } = validation.data;

  // 1. Проверка кода
  const verification = await verifyEmailVerificationCode(userId, code);
  if (!verification.success) {
    return NextResponse.json(
      { 
        error: 'Invalid verification code',
        code: 'INVALID_VERIFICATION_CODE'
      },
      { status: 400 }
    );
  }

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
}