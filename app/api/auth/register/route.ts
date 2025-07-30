import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'

export async function POST(request: Request) {
  try {
    const { login, password, nickname } = await request.json()

    // 1. Проверяем, существует ли пользователь
    const existingUser = await prisma.user.findUnique({
      where: { login }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким логином уже существует' },
        { status: 400 }
      )
    }

    // 2. Создаем нового пользователя
    // ВНИМАНИЕ: В реальном проекте пароль нужно хэшировать!
    const newUser = await prisma.user.create({
      data: {
        login,
        password, // Пока храним как есть (небезопасно!)
        nickname: nickname || login
      }
    })

    // 3. Возвращаем успешный ответ (без пароля)
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        login: newUser.login,
        nickname: newUser.nickname
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}