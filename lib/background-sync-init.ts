'use server';

import { totalStartSync } from '@/lib/total-start-sync';

export async function initializeBackgroundSync() {
  totalStartSync();
}