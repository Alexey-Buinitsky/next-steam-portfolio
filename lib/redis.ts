import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// NEW: Добавляем типизированные методы для работы с TTL
export const redisWithTTL = {
  async setex(key: string, ttl: number, value: any) {
    await redis.set(key, value, { ex: ttl });
  },
  async get(key: string) {
    return await redis.get(key);
  },
  async del(key: string) {
    return await redis.del(key);
  }
};
