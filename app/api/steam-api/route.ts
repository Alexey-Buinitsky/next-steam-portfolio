import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const start = searchParams.get('start')
	const count = searchParams.get('count')

	if (!start) {
		return NextResponse.json({ message: 'Missing "start" parameter' }, { status: 400 })
	}

	if (!count) {
		return NextResponse.json({ message: 'Missing "count" parameter' }, { status: 400 })
	}

	try {
		const response = await axios.get('https://steamcommunity.com/market/search/render/',
			{
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
					'Accept': 'application/json',
					'Accept-Language': 'en-US,en;q=0.9',
				},
				// headers: { 'User-Agent': 'Steam-Portfolio/1.0', 'Accept': 'application/json', },
				params: { appid: 730, start: 0, count: 10, sort_column: 'popular', sort_dir: 'desc', norender: 1 },
				timeout: 15000,
			})
		return NextResponse.json(response.data, { status: 200 })
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.code === 'ECONNABORTED') {
				console.error('[STEAM_API] Timeout:', error)
				return NextResponse.json({ error: 'Request timeout' }, { status: 504 })
			} else if (error.response?.status === 429) {
				console.error('[STEAM_API] Rate limit:', error)
				return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
			} else if (error.response?.status === 500) {
				console.error('[STEAM_API] Server error:', error)
				return NextResponse.json({ error: 'Steam server error' }, { status: 502 })
			} else if (error.response?.status) {
				console.error('[STEAM_API] HTTP error:', error.response.status, error)
				return NextResponse.json({ error: `Steam API error: ${error.response.status}` }, { status: error.response.status })
			}
		}
		console.error('[STEAM_API] Unknown error:', error)
		return NextResponse.json({ error: 'Failed to fetch Steam data' }, { status: 500 })
	}
}