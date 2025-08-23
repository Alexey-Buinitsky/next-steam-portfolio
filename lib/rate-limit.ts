import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis'; // Ваш существующий клиент Redis

// Создаем разные лимитеры для разных целей
export const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 запросов за 10 секунд
  analytics: true, // Включаем аналитику (опционально)
  prefix: '@upstash/ratelimit/auth', // Префикс для ключей в Redis
});

export const strictAuthLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '60 s'), // 5 запросов в минуту (для входа и восстановления)
  analytics: true,
  prefix: '@upstash/ratelimit/strict-auth',
});