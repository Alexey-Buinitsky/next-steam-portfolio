import { assetsApi } from '@/services/assets';
import { steamApi } from '@/services/steam';
import { prisma } from '@/prisma/prisma-client';
import type { SteamMarketItem } from '@/types/steam';

const STEAM_DELAY_MS = 15000
const STEAM_ITEMS_COUNT = 10

export const syncSteamMarket = async () => {

	let start = 0
	let totalProcessed = 0
	let hasMore = true
	let currentDelay = STEAM_DELAY_MS
	const syncedItemNames = new Set<string>()

	while (hasMore) {
		try {
			const data = await steamApi.fetch(start, STEAM_ITEMS_COUNT)

			if (!data?.results?.length) {
				console.log('[STEAM_SYNC] No more results, breaking')
				hasMore = false
				break
			}

			const validItems: SteamMarketItem[] = data.results.filter((item: SteamMarketItem) => item.name)

			if (validItems.length === 0) {
				console.log('[STEAM_SYNC] No valid items in batch, breaking')
				hasMore = false
				break
			}

			console.log(`[STEAM_SYNC] Batch start=${start}: received ${data.results.length} items, ${validItems.length} valid`)

			await assetsApi.sync(validItems)

			validItems.forEach((item) => { syncedItemNames.add(item.name || '') })

			totalProcessed += validItems.length
			start = totalProcessed
			hasMore = data.results.length >= STEAM_ITEMS_COUNT
			currentDelay = STEAM_DELAY_MS

			console.log(`[STEAM_SYNC] Processed ${validItems.length} items, total: ${totalProcessed}, next start: ${start}, hasMore: ${hasMore}`)

			if (hasMore) {
				await new Promise(resolve => setTimeout(resolve, currentDelay))
			}

		} catch (error) {
			console.error('[STEAM_SYNC] Request failed:', error)
			console.log(`[STEAM_SYNC] Last start position: ${start}`)
			currentDelay = Math.min(currentDelay * 2, 120000)
			await new Promise(resolve => setTimeout(resolve, currentDelay))
		}
	}

	try {
		if (syncedItemNames.size > 0) {
			const deactivatedCount = await prisma.asset.updateMany({
				where: { name: { notIn: Array.from(syncedItemNames) }, isActive: true },
				data: { isActive: false }
			})
			console.log(`[STEAM_SYNC] Deactivated ${deactivatedCount.count} old items`)
		}
	} catch (error) {
		console.error('[STEAM_SYNC] Failed to deactivate items:', error)
	}
}