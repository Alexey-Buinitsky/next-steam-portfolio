// app/api/sync/public/route.ts
import { NextResponse } from 'next/server';
import { syncSteamMarket } from '@/lib/synchronization';
import { assetsApi } from '@/services/assets';

export async function GET() {
  try {    
    await syncSteamMarket();
    await assetsApi.update();
    
    return NextResponse.json({ 
      success: true,
      message: 'Sync completed successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch {
    return NextResponse.json({ 
      success: false,
      message: 'Sync failed',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}