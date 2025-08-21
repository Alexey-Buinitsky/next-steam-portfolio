import { generateRandomString } from 'oslo/crypto';
import { TimeSpan } from 'oslo';
import { redis } from '@/lib/redis';

// Генерация кода верификации
export const generateEmailVerificationCode = async ( userId: number, email: string ): Promise<string> => {
  // Удаляем старые коды
  await redis.del(`email-verification:${userId}`);
  
  // Генерируем 6-значный код (цифры + буквы)
  const code = generateRandomString(6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  
  // Сохраняем с TTL 24 часа
  await redis.set(
    `email-verification:${userId}`,
    JSON.stringify({ code, email }),
    { ex: new TimeSpan(24, 'h').seconds() }
  );
  
  return code;
};

export const verifyEmailVerificationCode = async ( userId: number, code: string): Promise<{ success: boolean; email?: string; error?: string }> => {
  
  const stored = await redis.get(`email-verification:${userId}`);
  
  if (!stored) return { success: false }

  try {
    const parsed = typeof stored === 'string' ? JSON.parse(stored) : stored;
    
    if (!parsed?.code) return { success: false };

    if (parsed.code.toUpperCase() !== code.toUpperCase()) {
      return { success: false };
    }

    await redis.del(`email-verification:${userId}`);
    return { success: true, email: parsed.email };
  } catch {
    return { success: false };
  }
};