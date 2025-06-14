'use server';

import { totalStartSync } from './total-start-sync';

export async function initializeBackgroundSync() {
  totalStartSync();
}