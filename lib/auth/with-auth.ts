import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, IronSessionWithUser } from '@/lib'

interface RouteContext {
	params: Promise<Record<string, string>>;
}

export function withAuth<T extends Record<string, string> = Record<string, string>>(
	handler: (req: NextRequest, userId: number, context: { params: T }) => Promise<NextResponse>
) {
	return async (req: NextRequest, context: RouteContext): Promise<NextResponse> => {
		const response = new NextResponse()
		const session = await getIronSession<IronSessionWithUser>(req, response, sessionOptions)

		if (!session.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: response.headers })
		}

		const resolvedParams = await context.params as T

		try {
			return await handler(req, session.user.id, { params: resolvedParams })
		} catch (error) {
			console.error('Handler error:', error)
			return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 })
		}
	}
}