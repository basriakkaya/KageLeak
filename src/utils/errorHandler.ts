import { TFunction } from 'i18next'

export type ApiError = {
  status?: number
  message?: string
  code?: string
}

export const getErrorMessage = (error: ApiError, t: TFunction): string => {
  if (!error) return t('errors.api.general')

  // Network errors
  if (!navigator.onLine) return t('errors.api.network')
  
  // Timeout errors
  if (error.message?.includes('timeout')) return t('errors.api.timeout')

  // HTTP status based errors
  switch (error.status) {
    case 400:
      if (error.message?.includes('email')) return t('errors.api.invalidEmail')
      return t('errors.api.validation')
    case 401:
      return t('errors.api.unauthorized')
    case 404:
      return t('errors.api.notFound')
    case 429:
      return t('errors.api.rateLimit')
    case 500:
    case 502:
    case 503:
    case 504:
      return t('errors.api.serverError')
    default:
      return t('errors.api.general')
  }
}

export const handleApiError = (error: unknown, t: TFunction): string => {
  if (error instanceof Error) {
    return getErrorMessage({ message: error.message }, t)
  }
  
  if (typeof error === 'object' && error !== null) {
    return getErrorMessage(error as ApiError, t)
  }

  return t('errors.api.general')
} 