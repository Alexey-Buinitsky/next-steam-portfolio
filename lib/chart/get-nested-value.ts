export type NestedObject = Record<string, unknown>

export const getNestedValue = (obj: NestedObject, path: string): string => {
	const parts = path.split('.')
	let current: unknown = obj

	for (const part of parts) {
		if (typeof current !== 'object' || current === null || !(part in current)) { return '' }
		current = (current as Record<string, unknown>)[part]
	}

	return typeof current === 'string' ? current : ''
}