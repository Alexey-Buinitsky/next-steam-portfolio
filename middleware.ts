import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, type IronSessionWithUser } from '@/lib/session'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/portfolio',]

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl
  
  // Защищаем API роуты
  if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) {
    const session = await getIronSession<IronSessionWithUser>(request, response, sessionOptions)
    if (!session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // request.headers.set('x-user-id', session.user.id.toString())
  }
  
  // Защищаем клиентские роуты
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const session = await getIronSession<IronSessionWithUser>(request, response, sessionOptions)
    if (!session.user) {
      const url = new URL('/auth', request.url)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  }
  
  return response
}

export const config = {
  matcher: [
    '/portfolio',
    '/api/portfolios/:path*',
    '/api/portfolio-assets/:path*'
  ]
}

// export const config = {
//     matcher: ['/portfolio', '/api/portfolios/:path*']
// }