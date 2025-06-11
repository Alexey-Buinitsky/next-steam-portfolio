import { useQuery } from '@tanstack/react-query';
import { portfoliosApi } from '@/services/portfolios';
import { Portfolio } from '@prisma/client';

interface ReturnProps {
	portfolios: Portfolio[] | undefined;
	isFetching: boolean;
	fetchError: Error | null;
}

export const useFetchPortfolios = (): ReturnProps => {
	const { data, isLoading, error } = useQuery<Portfolio[], Error>({
		queryKey: ['portfolios'],
		queryFn: portfoliosApi.fetchAll,
	})

	return { portfolios: data, isFetching: isLoading, fetchError: error }
}