import { syncAssetPrices } from '@/lib/sync-asset-prices';
import { syncAllTotalItems } from '@/lib/total-steam-sync';

const SYNC_INTERVAL = 5 * 60 * 1000; // 5 минут между синхронизациями

let syncInterval: NodeJS.Timeout | null = null;
let isSyncing = false;

export const startSync = async () => {

	if (isSyncing) return;

	try {
		isSyncing = true
		console.log(`🔄 Начало синхронизации.`)

		// 1. Синхронизируем данные с Steam
		await syncAllTotalItems()

		// 2. Синхронизируем цены активов
		await syncAssetPrices()

		console.log(`✅ Фоновая синхронизация завершена.`)
	} catch (error) {
		console.error('❌ Ошибка фоновой синхронизации:', error)
	} finally {
		isSyncing = false
	}
}

export const totalStartSync = () => {
	if (typeof window !== 'undefined') return () => { }

	// Очистка предыдущего интервала
	if (syncInterval) {
		clearInterval(syncInterval)
		syncInterval = null
	}

	// Первый запуск
	startSync().catch(console.error)

	// Установка интервала
	syncInterval = setInterval(() => {
		startSync().catch(console.error)
	}, SYNC_INTERVAL)

	// Функция очистки
	return () => {
		if (syncInterval) {
			clearInterval(syncInterval)
			syncInterval = null
		}
	}
}