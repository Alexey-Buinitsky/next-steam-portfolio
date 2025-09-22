import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

export const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  prefix: '@upstash/ratelimit/auth',
})

export const strictAuthLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '60 s'),
  analytics: true,
  prefix: '@upstash/ratelimit/strict-auth',
})