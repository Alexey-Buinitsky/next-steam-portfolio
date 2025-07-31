import { formatContext } from "@/lib"

export const handleApiError = (error: unknown, context: string) => {
	console.error(`[${context}] Error:`, error)
	throw new Error(`Failed to ${formatContext(context)}`)
}