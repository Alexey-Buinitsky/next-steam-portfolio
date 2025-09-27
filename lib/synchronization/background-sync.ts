import { syncSteamMarket } from '@/lib/synchronization';
import { assetsApi } from '@/services/assets';

const SYNC_INTERVAL = 5 * 60 * 1000

let syncInterval: NodeJS.Timeout | null = null
let isSyncing = false
let isInitialized = false

export const backgroundSync = async () => {
	if (isSyncing) return

	try {
		isSyncing = true
		await syncSteamMarket()
		await assetsApi.update()
	} catch (error) {
		console.error('[BACKGROUND_SYNC] Sync failed:', error)
	} finally {
		isSyncing = false
	}
}

export const initializeBackgroundSync = () => {
	////
		// Не инициализировать в браузере
		if (typeof window !== 'undefined') {
			return () => { };
		}

		// Не инициализировать во время сборки
		if (process.env.npm_lifecycle_event === 'build') {
			console.log('[BACKGROUND_SYNC] Skipping during build');
			return () => { };
		}

		// Не инициализировать в preview режиме Vercel
		if (process.env.VERCEL_ENV === 'preview') {
			console.log('[BACKGROUND_SYNC] Skipping in Vercel preview');
			return () => { };
		}

		if (isInitialized) {
			return () => { };
		}

		isInitialized = true;
		console.log('[BACKGROUND_SYNC] Initializing in environment:', process.env.VERCEL_ENV || 'local');
	////

	// if (typeof window !== 'undefined') {
	// 	return () => { }
	// }

	// if (isInitialized) {
	// 	return () => { }
	// }

	// isInitialized = true

	if (syncInterval) {
		clearInterval(syncInterval)
		syncInterval = null
	}

	backgroundSync().catch(error => { console.error('[BACKGROUND_SYNC] Initial sync failed:', error) })

	syncInterval = setInterval(() => { backgroundSync().catch(error => { console.error('[BACKGROUND_SYNC] Periodic sync failed:', error) }) }, SYNC_INTERVAL)

	return () => {
		if (syncInterval) {
			clearInterval(syncInterval)
			syncInterval = null
		}
		isInitialized = false
	}
}