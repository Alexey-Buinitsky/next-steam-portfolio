import React from 'react';
import { initializeBackgroundSync } from '@/lib/synchronization';

export function BackgroundSyncProvider({ children }: { children?: React.ReactNode }) {
	if (typeof window !== 'undefined') {
		initializeBackgroundSync()
	}
	return children ? <>{children}</> : null
}
