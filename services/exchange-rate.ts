import { apiInstance } from './api-instance';
import { apiRoutes } from './api-routes';
import { handleApiError } from './api-error';
import { ConversionRate, CurrencyData } from '@/types/currencies';

export const exchangeRateApi = {

  fetch: async (fromCurrency: string, toCurrency: string): Promise<ConversionRate> => {
    try {
      const response = (await apiInstance.get<CurrencyData>(`${apiRoutes.EXCHANGE_RATE}?from=${fromCurrency}`)).data

      if (response.result !== 'success' || !response.conversion_rates) {
        throw new Error('Invalid Exchange rate API response format')
      }

      const rate = response.conversion_rates[toCurrency]

      if (!rate) {
        throw new Error(`Currency ${toCurrency} not found in rates`)
      }

      return response.conversion_rates
    } catch (error) {
      throw handleApiError(error, 'fetchExchangeRate')
    }
  },
}