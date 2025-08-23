//app/api/auth/login
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/prisma/prisma-client'
import { sessionOptions, IronSessionWithUser } from '@/lib/session'
import { getIronSession } from 'iron-session'
import { verifyPassword } from '@/lib/password-hash'
import { strictAuthLimiter } from '@/lib'

export async function POST(request: NextRequest) {
  // RATE LIMIT - ПРОВЕРЯЕМ ЛИМИТ ПЕРЕД ВСЕМ ОСТАЛЬНЫМ 
  const forwardedFor = request.headers.get('x-forwarded-for'); //получим с vercel
  const identifier = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'; // при dev режиме используем 127.0.0.1 - дальше можно использовать только forwardedFor.split(',')[0].trim()

  const { success, limit, reset, remaining } = await strictAuthLimiter.limit(identifier);
   if (!success) {
    // Если лимит исчерпан, сразу возвращаем ошибку
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return NextResponse.json(
      { 
        error: `Too many login attempts. Please try again in ${retryAfter} seconds.` 
      },
      { 
        status: 429,
        headers: {
          // Устанавливаем стандартные заголовки для лимита
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(reset).toISOString(),
        }
      }
    );
  }
  // RATE LIMIT
  
  
  try {
    const { email, password } = await request.json()

    // 1. Находим пользователя в БД
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Проверяем существование пользователя
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        { 
          error: "Email address not confirmed. Try registering again.", 
          email: user.email,
        },
        { status: 403 }
      );
    }

    // 3. Проверяем пароль
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 4. Работа с сессией
    // Создаем "заготовку" ответа
    const response = new NextResponse();
    // getIronSession модифицирует объект `response`, добавляя в него куки

    // Получаем сессию
    const session = await getIronSession<IronSessionWithUser>( request, response, sessionOptions )

    // Записываем данные в сессию
    session.user = {
        id: user.id,
        email: user.email,
        nickname: user.nickname || undefined
    }
    await session.save()

    // 5. Создаем финальный ответ на основе "заготовки" с куками
    const successResponse = NextResponse.json(
      { success: true, user: session.user },
      {
        status: 200,
        headers: response.headers // !!! ВАЖНО: наследуем заголовки с куками из response
      }
    );

    // 6. Добавляем к финальному ответу заголовки rate limit
    successResponse.headers.set('X-RateLimit-Limit', limit.toString());
    successResponse.headers.set('X-RateLimit-Remaining', remaining.toString());
    successResponse.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());

    // 7. Возвращаем ЕДИНЫЙ объект ответа, который содержит и куки сессии, и наши заголовки
    return successResponse;
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}