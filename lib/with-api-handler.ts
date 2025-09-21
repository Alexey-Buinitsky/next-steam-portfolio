// lib/with-api-handler.ts
import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { authLimiter, strictAuthLimiter } from './rate-limit';

// Базовый интерфейс для ошибок API
export interface ApiErrorResponse {
  error: string;
  code?: string;
  details?: unknown;
}

// Обновляем тип для параметров маршрута согласно требованиям Next.js
export interface RouteContext {
  params: Promise<Record<string, string>>;
}

// Универсальный тип для API обработчиков
export type ApiHandler = (options: {
  request: NextRequest;
  params?: Record<string, string>; // Для динамических роутов [slug]
  json?: unknown; // Распарсенное тело запроса
}) => Promise<NextResponse>;

interface WithApiHandlerOptions {
  rateLimiter?: Ratelimit; // Какой лимитер использовать
}

export function withApiHandler(
  handler: ApiHandler, 
  options: WithApiHandlerOptions = {}
) {
  const { rateLimiter } = options;
    
  return async (request: NextRequest, context: RouteContext): Promise<NextResponse> => {
    // Разрешаем Promise с параметрами
    const params = await context.params;
    
    // 1. RATE LIMITING (если передан лимитер)
    let rateLimitHeaders: Record<string, string> = {};

    if (rateLimiter) {
      const forwardedFor = request.headers.get('x-forwarded-for');
      const identifier = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

      const { success, limit, reset, remaining } = await rateLimiter.limit(identifier);
      
      if (!success) {
        const now = Date.now();
        const retryAfter = Math.floor((reset - now) / 1000);
        
        return NextResponse.json(
          { error: `Too many requests. Please try again in ${retryAfter} seconds.` },
          { 
            status: 429,
            headers: {
              'Retry-After': retryAfter.toString(),
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': new Date(reset).toISOString(),
            }
          }
        );
      }

      // Сохраняем заголовки для успешного ответа
      rateLimitHeaders = {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': new Date(reset).toISOString(),
      };
    }

    // 2. Парсим JSON тело (если это POST/PUT/PATCH)
    let jsonData: unknown = undefined;
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      try {
        jsonData = await request.json();
      } catch (error) {
        // Игнорируем ошибки парсинга для GET/DELETE или пустого тела
        console.error(error);
        if (request.method !== 'GET' && request.method !== 'DELETE') {
          return NextResponse.json(
            { error: 'Invalid JSON body' },
            { status: 400 }
          );
        }
      }
    }

    // 3. ВЫЗОВ ОСНОВНОГО ОБРАБОТЧИКА
    try {
      const response = await handler({
        request,
        params, // Теперь передаем разрешенные параметры
        json: jsonData,
      });
      
      // 4. ДОБАВЛЯЕМ ЗАГОЛОВКИ RATE LIMIT К УСПЕШНОМУ ОТВЕТУ
      if (rateLimiter && response.status !== 429) {
        for (const [key, value] of Object.entries(rateLimitHeaders)) {
          response.headers.set(key, value);
        }
      }

      return response;

    } catch (error) {
      // 5. ЦЕНТРАЛИЗОВАННАЯ ОБРАБОТКА ОШИБОК
      console.error('API Handler error:', error);

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

// Утилитарные функции для создания обработчиков с предустановленными настройками
export const withStrictAuthRateLimit = (handler: ApiHandler) => 
  withApiHandler(handler, { rateLimiter: strictAuthLimiter });

export const withAuthRateLimit = (handler: ApiHandler) => 
  withApiHandler(handler, { rateLimiter: authLimiter });

export const withDefaultRateLimit = (handler: ApiHandler) => 
  withApiHandler(handler, { rateLimiter: authLimiter });