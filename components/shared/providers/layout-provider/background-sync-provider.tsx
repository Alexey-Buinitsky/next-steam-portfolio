'use client'

import { useEffect } from 'react';
import { initializeBackgroundSync } from '@/lib/sync';

export function BackgroundSyncProvider({ children }: { children?: React.ReactNode }) {
	useEffect(() => { if (typeof window !== 'undefined') { return initializeBackgroundSync() } }, [])
	return children ? <>{children}</> : null
}
