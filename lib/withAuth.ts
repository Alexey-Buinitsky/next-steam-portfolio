import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, IronSessionWithUser } from '@/lib/session'

//Проверка в withAuth (сервер) - гарантирует защиту на уровне API
export function withAuth<T extends { [key: string]: any } = {}>(handler: (req: NextRequest, userId: number, context: { params: T }) => Promise<NextResponse>) {
  return async (req: NextRequest, context: { params: T }) => {
    // 1. Получаем сессию
    const response = new NextResponse();
    const session = await getIronSession<IronSessionWithUser>(req, response, sessionOptions);

    // 2. Проверяем userId
    if (!session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: response.headers }
      );
    }

    // 3. Вызываем обработчик
    try {
      return await handler(req, session.user.id, context);
    } catch (error) {
      console.error('Handler error:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Internal Server Error' },
        { status: 500 }
      );
    }
  };
}