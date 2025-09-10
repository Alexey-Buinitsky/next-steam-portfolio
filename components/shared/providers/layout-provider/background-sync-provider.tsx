'use client'

import React from 'react';
import { initializeBackgroundSync } from '@/lib/synchronization';

export function BackgroundSyncProvider({ children }: { children?: React.ReactNode }) {
	React.useEffect(() => { if (typeof window !== 'undefined') { return initializeBackgroundSync() } }, [])
	return children ? <>{children}</> : null
}
