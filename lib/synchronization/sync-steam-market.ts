import axios from 'axios';
import { prisma } from '@/prisma/prisma-client';
import type { SteamMarketItem } from '@/types/steam';

const STEAM_DELAY_MS = 5000
const STEAM_ITEMS_COUNT = 10

export const syncSteamMarket = async () => {

	let start = 0
	let currentDelay = STEAM_DELAY_MS
	const syncedItemNames = new Set<string>()

	while (true) {
		try {
			const { data } = await axios.get('https://steamcommunity.com/market/search/render/', {
				params: { appid: 730, start, count: STEAM_ITEMS_COUNT, sort_column: 'popular', sort_dir: 'desc', norender: 1 },
				timeout: 10000
			})

			if (!data?.results?.length) break

			const validItems: SteamMarketItem[] = data.results.filter((item: SteamMarketItem) => item.name)
			validItems.forEach((item) => { syncedItemNames.add(item.name || '') })

			const url = new URL(`${process.env.NEXT_PUBLIC_APP_URL}${process.env.NEXT_PUBLIC_API_URL}/assets`)
			await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(validItems) })

			start += STEAM_ITEMS_COUNT
			currentDelay = STEAM_DELAY_MS

			await new Promise(resolve => setTimeout(resolve, currentDelay))
		} catch (error) {
			console.error('[STEAM_API] Request failed:', error)
			currentDelay = Math.min(currentDelay * 2, 100000)
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