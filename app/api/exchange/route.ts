import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fromCurrency = searchParams.get('from')
  
  try {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates')
    }
    
    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}