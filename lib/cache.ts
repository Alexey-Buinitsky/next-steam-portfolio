// interface CacheItem {
//     data: any;
//     timestamp: number;
// }

// const cache: Record<string, CacheItem> = {};
// const CACHE_TTL_MS = 30 * 1000; // 30 секунд

// export function getFromCache(key: string): any | null {
//     const item = cache[key];
//     if (item && Date.now() - item.timestamp < CACHE_TTL_MS) {
//         return item.data;
//     }
//     return null;
// }

// export function setToCache(key: string, data: any): void {
//     cache[key] = {
//         data,
//         timestamp: Date.now()
//     };
// }

// export function clearExpiredCache() {
//     const now = Date.now();
//     Object.keys(cache).forEach(key => {
//         if (now - cache[key].timestamp > CACHE_TTL_MS) {
//             delete cache[key];
//         }
//     });
// }