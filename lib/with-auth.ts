import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, IronSessionWithUser } from '@/lib/session'

// Обновляем интерфейс для контекста согласно требованиям Next.js
export interface RouteContext {
  params: Promise<Record<string, string>>;
}

// Проверка в withAuth (сервер) - гарантирует защиту на уровне API
export function withAuth<T extends Record<string, string> = Record<string, string>>(
  handler: (req: NextRequest, userId: number, context: { params: T }) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: RouteContext): Promise<NextResponse> => {
    // 1. Получаем сессию
    const response = new NextResponse()
    const session = await getIronSession<IronSessionWithUser>(req, response, sessionOptions)

    // 2. Проверяем userId
    if (!session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: response.headers }
      )
    }

    // 3. Разрешаем Promise с параметрами
    const resolvedParams = await context.params as T;

    // 4. Вызываем обработчик
    try {
      return await handler(req, session.user.id, { params: resolvedParams });
    } catch (error) {
      console.error('Handler error:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Internal Server Error' },
        { status: 500 }
      )
    }
  }
}