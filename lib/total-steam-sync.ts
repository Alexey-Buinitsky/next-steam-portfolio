import axios from 'axios';
import { setTotalItem, markTotalSyncComplete, removeStaleItems, getTotalItemsCount } from './total-cache';
import { SteamMarketItem } from '@/types/steam';

const STEAM_DELAY_MS = 5000 // Текущая задержка (5 * 2(ниже) = 10 сек)
const STEAM_ITEMS_COUNT = 10 // Количество предметов за запрос

export const syncAllTotalItems = async () => {
  let start = 0
  let currentDelay = STEAM_DELAY_MS

  while (true) {
    try {
      const { data } = await axios.get('https://steamcommunity.com/market/search/render/', {
        params: {appid: 730, start, count: STEAM_ITEMS_COUNT, sort_column: 'popular', sort_dir: 'desc', norender: 1},
        timeout: 10000
      });

      if (!data?.results?.length) break

      data.results.forEach((item: SteamMarketItem) => {
        if (item.hash_name) setTotalItem(item.hash_name, item)
      });

      // При успешном запросе..
      start += STEAM_ITEMS_COUNT;
      currentDelay = STEAM_DELAY_MS; // Сброс задержки

      console.log(`📥 Загружено ${data.results.length} предметов. Всего: ${getTotalItemsCount()}`);
      await new Promise(resolve => setTimeout(resolve, currentDelay));
    } catch (error) {
      currentDelay = Math.min(currentDelay * 2, 100000); // Экспоненциальная задержка (макс. 1,5 мин)
      console.error(`❌ Ошибка запроса. Следующая попытка через ${currentDelay / 1000} сек...`);
      await new Promise(resolve => setTimeout(resolve, currentDelay));
    }
  }

  removeStaleItems()
  markTotalSyncComplete();
};