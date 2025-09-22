//app/api/auth/logout
import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/lib'

export async function POST(request: Request) {
  const response = new NextResponse()

  try {
    // Получаем сессию
    const session = await getIronSession(
      request,
      response,
      sessionOptions
    )

    // Уничтожаем сессию
    session.destroy()

    // Возвращаем успешный ответ
    return new NextResponse(
      JSON.stringify({ success: true }),
      {
        headers: response.headers,
        status: 200,
      }
    )

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}