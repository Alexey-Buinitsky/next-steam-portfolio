import { syncAllTotalItems } from './total-steam-sync';
import { getLastSuccessfulSyncTime, getTotalItemsCount } from './total-cache';

const SYNC_INTERVAL = 5 * 60 * 1000; // 5 минут между синхронизациями

let syncInterval: NodeJS.Timeout | null = null;
let isSyncing = false;

export const startSync = async  () => {

    if (isSyncing) return;
    
    try {
        isSyncing = true;
        console.log(`🔄 Начало синхронизации. Текущий кэш: ${getTotalItemsCount()} предметов`);
        await syncAllTotalItems();
        console.log(`✅ Фоновая синхронизация завершена. Последняя синхронизация: ${new Date(getLastSuccessfulSyncTime()).toLocaleTimeString()}`);
    } catch (error) {
        console.error('❌ Ошибка фоновой синхронизации:', error);
    } finally {
        isSyncing = false;
    }
};

export const totalStartSync = () => {
  if (typeof window !== 'undefined') return () => {};
  
  // Очистка предыдущего интервала
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
  }

  // Первый запуск
  startSync().catch(console.error);

  // Установка интервала
  syncInterval = setInterval(() => {
    startSync().catch(console.error);
  }, SYNC_INTERVAL);

  // Функция очистки
  return () => {
    if (syncInterval) {
      clearInterval(syncInterval);
      syncInterval = null;
    }
  };
};