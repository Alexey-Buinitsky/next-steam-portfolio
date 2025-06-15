'use server';

import { totalStartSync } from './total-start-sync';

export function initializeBackgroundSync() {
  totalStartSync();
}