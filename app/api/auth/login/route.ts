import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'
import { sessionOptions, IronSessionWithUser } from '@/lib/session'
import { getIronSession } from 'iron-session'

export async function POST(request: Request) {
  // Создаем объект Response для работы с cookies
  const response = new NextResponse()

  try {
    const { login, password } = await request.json()

    // 1. Находим пользователя в БД
    const user = await prisma.user.findUnique({
      where: { login },
    })

    // 2. Проверяем пароль
    if (!user || user.password !== password) {
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
        login: user.login,
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