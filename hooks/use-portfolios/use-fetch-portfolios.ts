import { useQuery } from '@tanstack/react-query';
import { portfoliosApi } from '@/services/portfolios';
import { Portfolio } from '@prisma/client';
import { useAuthCheck } from '@/hooks'; 

interface ReturnProps {
	portfolios: Portfolio[] | undefined;
	isFetching: boolean;
	fetchError: Error | null;
}

export const useFetchPortfolios = (): ReturnProps => {
	const { user } = useAuthCheck()

	const { data, isLoading, error } = useQuery<Portfolio[], Error>({
		queryKey: ['portfolios'],
		queryFn: portfoliosApi.fetch,
		enabled: !!user, 
		refetchInterval: 5 * 60 * 1000,
		staleTime: 2 * 60 * 1000,
	})

	return { portfolios: data, isFetching: isLoading, fetchError: error }
}