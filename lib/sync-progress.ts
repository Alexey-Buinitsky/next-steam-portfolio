// lib/sync-progress.ts
import { prisma } from '@/prisma/prisma-client';

export const syncProgressService = {
  getLastStart: async (): Promise<number> => {
    const progress = await prisma.syncProgress.findFirst({
      where: { service: 'steam_market' }
    });
    return progress?.lastStart || 0;
  },

  setLastStart: async (start: number): Promise<void> => {
    await prisma.syncProgress.upsert({
      where: { service: 'steam_market' },
      update: { lastStart: start, updatedAt: new Date() },
      create: { service: 'steam_market', lastStart: start }
    });
  }
};