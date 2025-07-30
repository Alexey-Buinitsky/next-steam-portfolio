import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, IronSessionWithUser } from '@/lib/session'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next() // Просто продолжаем цепочку без редиректов
  
  // Можно добавить логику для защиты конкретных API-эндпоинтов
  if (request.nextUrl.pathname.startsWith('/api/protected')) {
    const session = await getIronSession<IronSessionWithUser>(request, response, sessionOptions)
    
    if (!session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }
  
  return response
}

// Теперь middleware вообще не блокирует страницы
export const config = {
  matcher: [], // Пустой массив - middleware не применяется ни к каким страницам
  // Или можно указать только защищаемые API-роуты:
  // matcher: ['/api/protected/:path*']
}