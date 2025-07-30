import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, IronSessionWithUser } from '@/lib/session'

//Получение данных текущего пользователя
export async function GET(request: Request) {
  const response = new NextResponse()

  try {
    // Получаем сессию
    const session = await getIronSession<IronSessionWithUser>(
      request,
      response,
      sessionOptions
    )

    // Проверяем наличие пользователя в сессии
    if (!session.user) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      )
    }

    // Возвращаем данные пользователя
    return NextResponse.json(
      { user: session.user },
      { headers: response.headers }
    )

  } catch (error) {
    console.error('Get me error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}