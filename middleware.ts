import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, IronSessionWithUser } from '@/lib/session'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Защищаем все API роуты, кроме auth
  if (request.nextUrl.pathname.startsWith('/api') && !request.nextUrl.pathname.startsWith('/api/auth')) {
    const session = await getIronSession<IronSessionWithUser>(
      request, 
      response, 
      sessionOptions
    )
    
    if (!session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Добавляем user ID в заголовки для удобства
    request.headers.set('x-user-id', session.user.id.toString())
  }
  
  return response
}

export const config = {
  matcher: [
    // '/api/portfolios'
  ]
}
