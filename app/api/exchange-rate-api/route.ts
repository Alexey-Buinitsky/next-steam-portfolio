import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const fromCurrency = searchParams.get('from')

	if (!fromCurrency) {
		return NextResponse.json({ message: 'Missing "from" parameter' }, { status: 400 })
	}

	try {
		const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${fromCurrency}`)
		return NextResponse.json(response.data, { status: 200 })
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.code === 'ECONNABORTED') {
				console.error('[EXCHANGE_RATE_API] Timeout:', error)
				return NextResponse.json({ message: 'Request timeout' }, { status: 504 })
			} else if (error.response?.status === 429) {
				console.error('[EXCHANGE_RATE_API] Rate limit:', error)
				return NextResponse.json({ message: 'Too many requests' }, { status: 429 })
			} else if (error.response?.status === 500) {
				console.error('[EXCHANGE_RATE_API] Server error:', error)
				return NextResponse.json({ message: 'Exchange rate API server error' }, { status: 502 })
			} else if (error.response?.status === 401) {
				console.error('[EXCHANGE_RATE_API] Unauthorized:', error)
				return NextResponse.json({ message: 'Invalid API key' }, { status: 401 })
			} else if (error.response?.status) {
				console.error('[EXCHANGE_RATE_API] HTTP error:', error.response.status, error)
				return NextResponse.json({ message: `Exchange rate API error: ${error.response.status}` }, { status: error.response.status })
			}
		}
		console.error('[EXCHANGE_RATE_API] Unknown error:', error)
		return NextResponse.json({ message: 'Failed to fetch exchange rates' }, { status: 500 })
	}
}