import { NextResponse } from 'next/server';
import { syncSteamMarket } from '@/lib/synchronization';
import { assetsApi } from '@/services/assets';

export async function GET() {
	try {
		await syncSteamMarket()
		await assetsApi.update()
		return NextResponse.json({ message: 'Sync completed successfully', timestamp: new Date().toISOString() }, { status: 200 })
	} catch {
		return NextResponse.json({ message: 'Sync failed', timestamp: new Date().toISOString() }, { status: 500 })
	}
}

// https://dashboard.uptimerobot.com/