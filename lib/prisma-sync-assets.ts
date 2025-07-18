import { prisma } from '@/prisma/prisma-client';
import type { SteamMarketItem } from '@/types/steam';

export const PrismaSyncAssets = async (items: SteamMarketItem[]) => {
  const now = new Date();

   // Фильтруем undefined и null значения
  const validItems = items.filter(item => item.name);
  
  // 1. Обновляем/добавляем предметы
  await prisma.$transaction(async (tx) => {
    // Для всех пришедших предметов
    for (const item of validItems) {
      await tx.asset.upsert({
        where: { name: item.name },
        update: { 
          price: item.sell_price || 0,
          volume: item.sell_listings || 0,
          updatedAt: now,
          isActive: true // Помечаем как активный
        },
        create: {
          name: item.name || '',
          price: item.sell_price || 0,
          volume: item.sell_listings || 0,
          type: item.asset_description?.type || 'unknown',
          imageUrl: item.asset_description?.icon_url || '',
          isActive: true,
          createdAt: now,
          updatedAt: now
        }
      });
    }
  });
};