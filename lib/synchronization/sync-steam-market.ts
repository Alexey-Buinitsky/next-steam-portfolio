import { assetsApi } from '@/services/assets';
import { steamApi } from '@/services/steam';
import { prisma } from '@/prisma/prisma-client';
import type { SteamMarketItem } from '@/types/steam';
import { syncProgressService } from '@/lib/sync-progress';

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

// export const syncSteamMarket = async (resumeFromLastPoint: boolean = true) => {
//   let start = 0;
  
//   if (resumeFromLastPoint) {
//     start = await syncProgressService.getLastStart();
//     console.log(`🔄 Resuming sync from start=${start}`);
//   }

//   let currentDelay = STEAM_DELAY_MS;
//   const syncedItemNames = new Set<string>();
//   let hasNewData = false;

//   while (true) {
//     try {
//       const data = await steamApi.fetch(start, STEAM_ITEMS_COUNT);
      
//       if (!data?.results?.length) {
//         // Дошли до конца - начинаем с начала в следующий раз
//         if (hasNewData) {
//           await syncProgressService.setLastStart(0);
//           console.log('✅ Reached end of list, resetting to start=0');
//         }
//         break;
//       }

//       const validItems: SteamMarketItem[] = data.results.filter(item => item.name);
//       if (validItems.length > 0) {
//         validItems.forEach(item => syncedItemNames.add(item.name || ''));
//         await assetsApi.sync(validItems);
//         hasNewData = true;
        
//         // Сохраняем прогресс после КАЖДОГО успешного запроса
//         await syncProgressService.setLastStart(start);
//       }

//       start += STEAM_ITEMS_COUNT;
//       currentDelay = STEAM_DELAY_MS;

//       await new Promise(resolve => setTimeout(resolve, currentDelay));
      
//     } catch (error) {
//       console.error('[STEAM_SYNC] Request failed, retrying:', error);
      
//       // При ошибке НЕ сохраняем прогресс - пробуем с того же места
//       currentDelay = Math.min(currentDelay * 2, 100000);
//       await new Promise(resolve => setTimeout(resolve, currentDelay));
//     }
//   }

//   // Обновляем неактивные items
//   if (syncedItemNames.size > 0) {
//     await prisma.asset.updateMany({
//       where: { name: { notIn: Array.from(syncedItemNames) }, isActive: true },
//       data: { isActive: false }
//     });
//   }
// };



// import { assetsApi } from '@/services/assets';
// import { steamApi } from '@/services/steam';
// import { prisma } from '@/prisma/prisma-client';
// import type { SteamMarketItem } from '@/types/steam';

// const STEAM_DELAY_MS = 15000
// const STEAM_ITEMS_COUNT = 10

// export const syncSteamMarket = async () => {

// 	let start = 0
// 	let totalProcessed = 0
// 	let hasMore = true
// 	let currentDelay = STEAM_DELAY_MS
// 	const syncedItemNames = new Set<string>()

// 	while (hasMore) {
// 		try {
// 			const data = await steamApi.fetch(start, STEAM_ITEMS_COUNT)

// 			if (!data?.results?.length) {
// 				console.log('[STEAM_SYNC] No more results, breaking')
// 				hasMore = false
// 				break
// 			}

// 			const validItems: SteamMarketItem[] = data.results.filter((item: SteamMarketItem) => item.name)

// 			if (validItems.length === 0) {
// 				console.log('[STEAM_SYNC] No valid items in batch, breaking')
// 				hasMore = false
// 				break
// 			}

// 			console.log(`[STEAM_SYNC] Batch start=${start}: received ${data.results.length} items, ${validItems.length} valid`)

// 			await assetsApi.sync(validItems)

// 			validItems.forEach((item) => { syncedItemNames.add(item.name || '') })

// 			totalProcessed += validItems.length
// 			start = totalProcessed
// 			hasMore = data.results.length >= STEAM_ITEMS_COUNT
// 			currentDelay = STEAM_DELAY_MS

// 			console.log(`[STEAM_SYNC] Processed ${validItems.length} items, total: ${totalProcessed}, next start: ${start}, hasMore: ${hasMore}`)

// 			if (hasMore) {
// 				await new Promise(resolve => setTimeout(resolve, currentDelay))
// 			}

// 		} catch (error) {
// 			console.error('[STEAM_SYNC] Request failed:', error)
// 			console.log(`[STEAM_SYNC] Last start position: ${start}`)
// 			currentDelay = Math.min(currentDelay * 2, 120000)
// 			await new Promise(resolve => setTimeout(resolve, currentDelay))
// 		}
// 	}

// 	try {
// 		if (syncedItemNames.size > 0) {
// 			const deactivatedCount = await prisma.asset.updateMany({
// 				where: { name: { notIn: Array.from(syncedItemNames) }, isActive: true },
// 				data: { isActive: false }
// 			})
// 			console.log(`[STEAM_SYNC] Deactivated ${deactivatedCount.count} old items`)
// 		}
// 	} catch (error) {
// 		console.error('[STEAM_SYNC] Failed to deactivate items:', error)
// 	}
// }