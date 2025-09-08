import { useQuery } from '@tanstack/react-query';
import { exchangeRateApi } from '@/services/exchange-rate';
import { ConversionRate } from '@/types/currencies';

interface Props {
	fromCurrency: string;
	toCurrency: string;
}

interface ReturnProps {
	rates: ConversionRate | undefined;
	isLoading: boolean;
	error: Error | null;
}

export const useFetchExchangeRates = ({ fromCurrency, toCurrency }: Props): ReturnProps => {

	const { data, isLoading, error } = useQuery<ConversionRate, Error>({
		queryKey: ['exchangeRates', fromCurrency],
		queryFn: () => exchangeRateApi.fetch(fromCurrency, toCurrency),
		enabled: !!fromCurrency && !!toCurrency && fromCurrency !== toCurrency,
		staleTime: 24 * 60 * 60 * 1000,
		gcTime: 7 * 24 * 60 * 60 * 1000,
		retry: 2,
		refetchOnMount: true,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	})

	return { rates: data, isLoading, error }
}