import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { sendPasswordResetEmail } from '@/lib';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // В целях безопасности не сообщаем, что пользователь не существует
      return NextResponse.json({
        success: true,
        message: 'If the email exists, a password reset code has been sent',
      });
    }

    // Отправляем email с кодом сброса
    await sendPasswordResetEmail({ 
      userId: user.id, 
      email: user.email 
    });

    return NextResponse.json({
      success: true,
      message: 'If the email exists, a password reset code has been sent',
      userId: user.id,
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}