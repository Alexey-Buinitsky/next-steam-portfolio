//app/lib/api-error.ts
interface ApiError {
  error: string;
  code?: string;    // Опциональный код ошибки (например, 'USER_NOT_FOUND')
  details?: any;    // Дополнительные детали
}

function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'error' in error
}

export async function handleFetchError(response:  Response): Promise<void> {
  if (response.ok) return
  
  let errorData: unknown
  try {
    errorData = await response.json()
  } catch {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }
  
  if (isApiError(errorData)) {
    throw new Error(errorData.error)
  }
  
  throw new Error('An unexpected error occurred')
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