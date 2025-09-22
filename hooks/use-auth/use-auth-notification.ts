'use client'

import React from 'react';
import { notify, handleApiError, handleApiSuccess, NotificationOptions } from '@/lib';

export const useAuthNotifications = () => {
	const showNotification = React.useCallback((
		type: 'success' | 'error' | 'warning' | 'info',
		message: string,
		options?: NotificationOptions
	) => {
		notify[type](message, options)
	}, [])

	const showError = React.useCallback((error: unknown, fallbackMessage?: string) => {
		handleApiError(error, fallbackMessage)
	}, [])

	const showSuccess = React.useCallback((message: string) => {
		handleApiSuccess(message)
	}, [])

	return {
		showNotification,
		showError,
		showSuccess,
	}
}