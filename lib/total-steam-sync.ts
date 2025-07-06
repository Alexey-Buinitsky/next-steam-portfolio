import axios from 'axios';
import { prisma } from '@/prisma/prisma-client';
// import { setTotalItem, markTotalSyncComplete, removeStaleItems, getTotalItemsCount } from './total-cache';
import type { SteamMarketItem } from '@/types/steam';
import { PrismaSyncAssets } from './prisma-sync-assets';

const STEAM_DELAY_MS = 5000 // Текущая задержка (5 * 2(ниже) = 10 сек)
const STEAM_ITEMS_COUNT = 10 // Количество предметов за запрос

export const syncAllTotalItems = async () => {

  let start = 0
  let currentDelay = STEAM_DELAY_MS
  let allSyncedHashes = new Set<string>();

  while (true) {
    try {
      const { data } = await axios.get('https://steamcommunity.com/market/search/render/', {
        params: {appid: 730, start, count: STEAM_ITEMS_COUNT, sort_column: 'popular', sort_dir: 'desc', norender: 1},
        timeout: 10000
      });

      if (!data?.results?.length) break

      // При успешном запросе..
      
      const validItems = data.results.filter((item: SteamMarketItem) => item.name);

      validItems.forEach((item: SteamMarketItem) => {
        allSyncedHashes.add(item.name || '');
        // setTotalItem(item.name || '', item);
      });
      
      await PrismaSyncAssets(validItems);

      start += STEAM_ITEMS_COUNT;
      currentDelay = STEAM_DELAY_MS; // Сброс задержки

      console.log(`📥 Загружено ${validItems.length} предметов.`);
      await new Promise(resolve => setTimeout(resolve, currentDelay));
    } catch (error) {
      currentDelay = Math.min(currentDelay * 2, 100000); // Экспоненциальная задержка (макс. 1,5 мин)
      console.error(`❌ Ошибка запроса. Следующая попытка через ${currentDelay / 1000} сек...`);
      await new Promise(resolve => setTimeout(resolve, currentDelay));
    }
  }

   // Финализация - пометка всех отсутствующих предметов
  if (allSyncedHashes.size > 0) {
    await prisma.asset.updateMany({
      where: { 
        name: { notIn: Array.from(allSyncedHashes) },
        isActive: true
      },
      data: { isActive: false }
    });
  }

  // removeStaleItems()
  // markTotalSyncComplete();
};