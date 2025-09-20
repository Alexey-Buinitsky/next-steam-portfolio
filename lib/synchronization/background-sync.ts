import { syncSteamMarket } from '@/lib/synchronization';
import { assetsApi } from '@/services/assets';

const SYNC_INTERVAL = 5 * 60 * 1000

let syncInterval: NodeJS.Timeout | null = null
let isSyncing = false

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
	if (typeof window !== 'undefined') {
    return () => { }
  }

	if (syncInterval) {
		clearInterval(syncInterval)
	}

	backgroundSync().catch(error => { console.error('[BACKGROUND_SYNC] Initial sync failed:', error) })

	syncInterval = setInterval(() => { backgroundSync().catch(error => { console.error('[BACKGROUND_SYNC] Periodic sync failed:', error) }) }, SYNC_INTERVAL)

	return () => {
		if (syncInterval) {
			clearInterval(syncInterval)
			syncInterval = null
		}
	}
}