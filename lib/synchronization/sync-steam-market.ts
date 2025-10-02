import { assetsApi } from '@/services/assets';
import { steamApi } from '@/services/steam';
import { prisma } from '@/prisma/prisma-client';
import type { SteamMarketItem } from '@/types/steam';

const STEAM_DELAY_MS = 15000
const STEAM_ITEMS_COUNT = 10

export const syncSteamMarket = async () => {

	let start = 0
	let currentDelay = STEAM_DELAY_MS
	const syncedItemNames = new Set<string>()

	while (true) {
		try {
			const data = await steamApi.fetch(start, STEAM_ITEMS_COUNT)

			if (!data?.results?.length) break

			const validItems: SteamMarketItem[] = data.results.filter((item: SteamMarketItem) => item.name)
			validItems.forEach((item) => { syncedItemNames.add(item.name || '') })

			await assetsApi.sync(validItems)

			start += STEAM_ITEMS_COUNT
			currentDelay = STEAM_DELAY_MS

			await new Promise(resolve => setTimeout(resolve, currentDelay))
		} catch (error) {
			console.error('[STEAM_SYNC] Request failed, retrying:', error)
			currentDelay = Math.min(currentDelay * 2, 120000)
			await new Promise(resolve => setTimeout(resolve, currentDelay))
		}
	}

	if (syncedItemNames.size > 0) {
		await prisma.asset.updateMany({
			where: { name: { notIn: Array.from(syncedItemNames) }, isActive: true },
			data: { isActive: false }
		})
	}
}