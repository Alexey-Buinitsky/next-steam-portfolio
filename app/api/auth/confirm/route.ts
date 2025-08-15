// //app/api/auth/confirm
// import { NextResponse } from 'next/server';
// import { prisma } from '@/prisma/prisma-client';
// import { verifyToken } from '@/lib';
// import { redisWithTTL } from '@/lib/redis';
// import { getIronSession } from 'iron-session';
// import { sessionOptions, IronSessionWithUser } from '@/lib/session';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const token = searchParams.get('token');
//     const email = searchParams.get('email');

//     if (!token || !email) {
//       return NextResponse.json(
//         { error: 'Token and email are required' },
//         { status: 400 }
//       );
//     }

//     // Проверяем JWT токен  
//     const decoded = verifyToken(token);
//     if (!decoded) {
//         return NextResponse.json(
//             { error: 'Invalid or expired token' },
//             { status: 400 }
//         );
//     }


//     // Проверяем Redis
//     const cachedData = await redisWithTTL.get(`registration:${token}`);
//     if (!cachedData) {
//       return NextResponse.json(
//         { error: 'Invalid or expired token' },
//         { status: 400 }
//       );
//     }

//     const { password, nickname } = typeof cachedData === 'string'
//         ? JSON.parse(cachedData)
//         : cachedData;

//     // NEW: Создаём пользователя (теперь точно подтверждённого)
//     const user = await prisma.user.create({
//       data: {
//         email,
//         passwordHash: password,
//         nickname: nickname || email.split('@')[0],
//         emailVerified: true, // NEW: Помечаем как подтверждённого
//       },
//     });

//     // NEW: Автоматическая авторизация
//     const session = await getIronSession<IronSessionWithUser>(
//       request,
//       new NextResponse(),
//       sessionOptions
//     );
//     session.user = { id: user.id, email };
//     await session.save();

//     // NEW: Чистим кеш
//     await redisWithTTL.del(`registration:${token}`);

//     return NextResponse.json({
//       success: true,
//       redirectUrl: '/', // NEW: Перенаправляем на главную
//     });

//   } catch (error) {
//     console.error('Confirmation error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }