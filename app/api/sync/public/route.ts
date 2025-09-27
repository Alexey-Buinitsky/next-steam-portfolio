// app/api/sync/public/route.ts
import { NextResponse } from 'next/server';
import { syncSteamMarket } from '@/lib/synchronization';
import { assetsApi } from '@/services/assets';

export async function GET() {
  try {
    await syncSteamMarket();
    await assetsApi.update();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}