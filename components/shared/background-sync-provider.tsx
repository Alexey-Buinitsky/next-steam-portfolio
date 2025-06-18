'use client';

import { useEffect } from 'react';
import { initializeBackgroundSync } from '@/lib/background-sync-init';

export function BackgroundSyncProvider({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    initializeBackgroundSync();
  }, []);

  return children ? <>{children}</> : null;
}
