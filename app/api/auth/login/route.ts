//app/api/auth/login
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'
import { sessionOptions, IronSessionWithUser } from '@/lib/session'
import { getIronSession } from 'iron-session'
import { verifyPassword } from '@/lib/password-hash'

export async function POST(request: Request) {
  // Создаем объект Response для работы с cookies
  const response = new NextResponse()

  try {
    const { email, password } = await request.json()

    // 1. Находим пользователя в БД
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Проверяем, подтверждён ли email
    if (!user?.emailVerified) {
      return NextResponse.json(
        { 
          error: 'Email not confirmed. Check your mail.', 
          needsVerification: true,
          email: user?.email,
        },
        { status: 403 }
      );
    }

    // 2. Проверяем пароль
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // 3. Получаем сессию
    const session = await getIronSession<IronSessionWithUser>(
        request,
        response,
        sessionOptions
    )

    // 4. Записываем данные в сессию
    session.user = {
        id: user.id,
        email: user.email,
        nickname: user.nickname || undefined
    }
    await session.save()

    // 5. Возвращаем ответ с установленными cookies
    return new NextResponse(
      JSON.stringify({ success: true, user: session.user }),
      {
        headers: response.headers, // Важно: устанавливаем/передаём куки!
        status: 200,
      }
    )

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}