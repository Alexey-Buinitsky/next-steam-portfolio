//app/api/auth/login
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/prisma/prisma-client'
import { sessionOptions, IronSessionWithUser } from '@/lib/session'
import { getIronSession } from 'iron-session'
import { verifyPassword, validateDataWithSchema, authSchema, withStrictAuthRateLimit } from '@/lib'

// Экспортируем обернутый обработчик
export const POST = withStrictAuthRateLimit(loginHandler);

async function loginHandler({ request, json }: { request: NextRequest; json?: unknown }) {
// export async function POST(request: NextRequest) {
//   const forwardedFor = request.headers.get('x-forwarded-for'); 
//   const identifier = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

//   const { success, limit, reset, remaining } = await strictAuthLimiter.limit(identifier);
//    if (!success) {
//     const now = Date.now();
//     const retryAfter = Math.floor((reset - now) / 1000);
//     return NextResponse.json(
//       { 
//         error: `Too many login attempts. Please try again in ${retryAfter} seconds.` 
//       },
//       { 
//         status: 429,
//         headers: {
//           'Retry-After': retryAfter.toString(),
//           'X-RateLimit-Limit': limit.toString(),
//           'X-RateLimit-Remaining': remaining.toString(),
//           'X-RateLimit-Reset': new Date(reset).toISOString(),
//         }
//       }
//     );
//   }

  if (!json) {
    return NextResponse.json(
      { error: 'Request body is required' },
      { status: 400 }
    );
  }
  
  // Создаем "заготовку" ответа

  const response = new NextResponse();

  // const json = await request.json()
  const validation = validateDataWithSchema(authSchema, json)
  if (!validation.isValid) {
    return NextResponse.json(
      { error: validation.error },
      { status: 400 }
    );
  }

  const { email, password } = validation.data

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
        error: 'Email requires verification.',
        code: 'EMAIL_VERIFICATION_REQUIRED', 
        email: user.email, // Передаем email для предзаполнения
        userId: user.id,    // Передаем ID для повторной отправки кода
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

  // Получаем сессию -  getIronSession модифицирует объект `response`, добавляя в него куки
  const session = await getIronSession<IronSessionWithUser>( request, response, sessionOptions )

  // Записываем данные в сессию
  session.user = {
      id: user.id,
      email: user.email,
      nickname: user.nickname || undefined
  }
  await session.save()

  return NextResponse.json(
    { success: true, user: session.user },
    {
      status: 200,
      headers: response.headers // !!! ВАЖНО: наследуем заголовки с куками из response
    }
  );

    // 5. Создаем финальный ответ на основе "заготовки" с куками
    // const successResponse = NextResponse.json(
    //   { success: true, user: session.user },
    //   {
    //     status: 200,
    //     headers: response.headers
    //   }
    // );

    // // 6. Добавляем к финальному ответу заголовки rate limit
    // successResponse.headers.set('X-RateLimit-Limit', limit.toString());
    // successResponse.headers.set('X-RateLimit-Remaining', remaining.toString());
    // successResponse.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());

    // // 7. Возвращаем ЕДИНЫЙ объект ответа, который содержит и куки сессии, и наши заголовки
    // return successResponse;
}


