//app/lib/api-error/api-error.ts
export interface ApiError {
  error: string;
  code?: string;    // Опциональный код ошибки (например, 'USER_NOT_FOUND')
  details?: unknown;    // Дополнительные детали
}

function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'error' in error
}

export async function getFetchError(response: Response): Promise<ApiError> {
  if (response.ok) {
    throw new Error('Response is not an error')
  }
  
  try {
    const errorData = await response.json()
    return isApiError(errorData) 
      ? errorData 
      : { error: 'An unexpected error occurred' }
  } catch {
    return { 
      error: `HTTP ${response.status}: ${response.statusText}` 
    }
  }
}
