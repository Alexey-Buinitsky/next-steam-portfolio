import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { authLimiter, strictAuthLimiter } from '@/lib';

export interface ApiErrorResponse {
	error: string;
	code?: string;
	details?: unknown;
}

interface RouteContext {
	params: Promise<Record<string, string>>;
}

export type ApiHandler = (options: { request: NextRequest; params?: Record<string, string>; json?: unknown; }) => Promise<NextResponse>

interface WithApiHandlerOptions {
	rateLimiter?: Ratelimit;
}

export function withApiHandler(handler: ApiHandler, options: WithApiHandlerOptions = {}) {
	const { rateLimiter } = options

	return async (request: NextRequest, context: RouteContext): Promise<NextResponse> => {
		const params = await context.params

		let rateLimitHeaders: Record<string, string> = {}

		if (rateLimiter) {
			const forwardedFor = request.headers.get('x-forwarded-for')
			const identifier = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'

			const { success, limit, reset, remaining } = await rateLimiter.limit(identifier)

			if (!success) {
				const now = Date.now();
				const retryAfter = Math.floor((reset - now) / 1000)

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
				)
			}

			rateLimitHeaders = {
				'X-RateLimit-Limit': limit.toString(),
				'X-RateLimit-Remaining': remaining.toString(),
				'X-RateLimit-Reset': new Date(reset).toISOString(),
			}
		}

		let jsonData: unknown = undefined
		if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
			try {
				jsonData = await request.json()
			} catch (error) {
				console.error(error)
				if (request.method !== 'GET' && request.method !== 'DELETE') {
					return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
				}
			}
		}

		try {
			const response = await handler({ request, params, json: jsonData, })

			if (rateLimiter && response.status !== 429) {
				for (const [key, value] of Object.entries(rateLimitHeaders)) {
					response.headers.set(key, value)
				}
			}

			return response
		} catch (error) {
			console.error('API Handler error:', error)
			return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
		}
	}
}

export const withStrictAuthRateLimit = (handler: ApiHandler) =>
	withApiHandler(handler, { rateLimiter: strictAuthLimiter })

export const withAuthRateLimit = (handler: ApiHandler) =>
	withApiHandler(handler, { rateLimiter: authLimiter })

export const withDefaultRateLimit = (handler: ApiHandler) =>
	withApiHandler(handler, { rateLimiter: authLimiter })