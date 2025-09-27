// app/api/cron/sync/route.ts
import { NextResponse } from 'next/server';
import { syncSteamMarket } from '@/lib/synchronization';
import { assetsApi } from '@/services/assets';

// Секретный ключ для защиты от несанкционированного доступа
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  // Проверяем секретный ключ из заголовков
  const authHeader = request.headers.get('authorization');
  
  if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🚀 [CRON_SYNC] Starting scheduled sync...');
    
    // Выполняем синхронизацию
    await syncSteamMarket();
    await assetsApi.update();
    
    console.log('✅ [CRON_SYNC] Sync completed successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Sync completed successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ [CRON_SYNC] Sync failed:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}