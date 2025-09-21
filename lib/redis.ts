import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// NEW: Добавляем типизированные методы для работы с TTL
export const redisWithTTL = {
  async setex<T = unknown>(key: string, ttl: number, value: T) {
    await redis.set(key, value, { ex: ttl })
  },
  async get<T = unknown>(key: string): Promise<T | null> {
    return await redis.get(key) as T | null
  },
  async del(key: string) {
    return await redis.del(key)
  }
}