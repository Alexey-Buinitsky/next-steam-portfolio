'use client'

import { useState } from 'react';

export const useImageError = () => {
	const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

	const handleImageError = (id: number) => {
		setImageErrors(prev => ({ ...prev, [id]: true }))
	}

	return { imageErrors, handleImageError }
}