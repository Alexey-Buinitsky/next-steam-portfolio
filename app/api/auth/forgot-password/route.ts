import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { sendPasswordResetEmail, validateDataWithSchema, forgotPasswordSchema, withStrictAuthRateLimit} from '@/lib';

export const POST = withStrictAuthRateLimit(forgotPasswordHandler);

async function forgotPasswordHandler({ json }: {request: NextRequest, json?:unknown}) {
  if (!json) {
    return NextResponse.json(
      { error: 'Request body is required' },
      { status: 400 }
    );
  }

  const validation = validateDataWithSchema(forgotPasswordSchema, json);
  if (!validation.isValid) {
    return NextResponse.json(
      { error: validation.error },
      { status: 400 }
    );
  }

  const { email } = validation.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // В целях безопасности не сообщаем, что пользователь не существует
    return NextResponse.json({
      code: 'USER_NOT_FOUND',
      message: 'If the email exists, a password reset code has been sent',
    });
  }

  // Отправляем email с кодом сброса
  await sendPasswordResetEmail({ 
    userId: user.id, 
    email: user.email 
  });

  return NextResponse.json(
    { 
      success: true, 
      message: 'If the email exists, a password reset code has been sent',
      userId: user.id,
    },
    { status: 200 }
  );
}