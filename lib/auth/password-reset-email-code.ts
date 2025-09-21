import { generateRandomString } from 'oslo/crypto';
import { TimeSpan } from 'oslo';
import { redis } from '@/lib/redis';

// Генерация кода сброса пароля 
export const generatePasswordResetCode = async (userId: number, email: string): Promise<string> => {
  // Удаляем старые коды
  await redis.del(`password-reset:${userId}`)
  
  // Генерируем 6-значный код (цифры + буквы)
  const code = generateRandomString(6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  
  // Сохраняем с TTL 1 час
  await redis.set(
    `password-reset:${userId}`,
    JSON.stringify({ code, email }),
    { ex: new TimeSpan(1, 'h').seconds() }
  )

  return code
}

// Верификация кода сброса пароля
export const verifyPasswordResetCode = async (userId: number, code: string): Promise<{ success: boolean; email?: string }> => {
  const stored = await redis.get(`password-reset:${userId}`)
  
  if (!stored) {
    return { success: false }
  }

  try {
    const parsed = typeof stored === 'string' ? JSON.parse(stored) : stored
    
    if (!parsed?.code) {
      return { success: false }
    }

    if (parsed.code.toUpperCase() !== code.toUpperCase()) {
      return { success: false }
    }

    // НЕ УДАЛЯЕМ КОД - только проверяем
    return { success: true, email: parsed.email }
  } catch (error) {
    console.error('Failed to send password reset email:', error)
    return { success: false }
  }
}

// Отдельная функция для инвалидации кода после успешного сброса
export const invalidatePasswordResetCode = async (userId: number): Promise<void> => {
  await redis.del(`password-reset:${userId}`)
}