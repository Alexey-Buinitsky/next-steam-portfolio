// import type { SteamMarketItem } from "@/types/steam";

// interface CachedItem {
//   data: SteamMarketItem,
//   lastUpdated: number,
// }

// const TOTAL_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 часа

// // let itemsCache: Record<string, CachedItem> = {};

// // let lastSyncTime = 0; // Время последней синхронизации
// // let lastSuccessfulSyncTime = 0; // Время последней успешной синхронизации

// const globalForCache = globalThis as unknown as {
//   itemsCache: Record<string, CachedItem>;
//   lastSyncTime: number;
//   lastSuccessfulSyncTime: number;
// };

// let itemsCache = globalForCache.itemsCache || (globalForCache.itemsCache = {});
// let lastSyncTime = globalForCache.lastSyncTime || 0;
// let lastSuccessfulSyncTime = globalForCache.lastSuccessfulSyncTime || 0;

// // 1. Получение предмета по хешу
// export const getTotalItem = (hashName: string): SteamMarketItem | undefined => itemsCache[hashName]?.data;

// // 2. Получение всех предметов
// export const getAllTotalItems = (): SteamMarketItem[] => Object.values(itemsCache).map(item => item.data);

// // 3. Сохранение предмета
// export const setTotalItem = (hashName: string, data: SteamMarketItem): boolean => {
//   const exists = itemsCache[hashName];
//   itemsCache[hashName] = { data, lastUpdated: Date.now() };
//   return !exists; // вернёт true, если предмет новый
// };

// // 4. Удаляем устаревшие предметы (которые не обновлялись больше 24 часов)
// export const removeStaleItems = (): number => {
//   const now = Date.now();
//   let removedCount = 0;

//   Object.keys(itemsCache).forEach(hashName => {
//     if (now - itemsCache[hashName].lastUpdated > TOTAL_CACHE_TTL) {
//       delete itemsCache[hashName];
//       removedCount++;
//     }
//   });

//   return removedCount; // сколько удалено
// };

// // 5. Отметка завершения синхронизации
// export const markTotalSyncComplete = (success: boolean = true) => {
//   lastSyncTime = Date.now(); // Запись текущего времени
//   if (success) {
//     lastSuccessfulSyncTime = lastSyncTime;
//   }
// };

// // 6. Получение времени последней успешной синхронизации
// export const getLastSuccessfulSyncTime = (): number => lastSuccessfulSyncTime;

// // 7. Подсчет предметов
// export const getTotalItemsCount = (): number => Object.keys(itemsCache).length;



