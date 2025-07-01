import { useQuery } from '@tanstack/react-query';
import { portfoliosApi } from '@/services/portfolios';
import { PortfolioAsset } from '@prisma/client';

interface ReturnProps {
	portfolioAssets: PortfolioAsset[] | undefined;
	isFetching: boolean;
	fetchError: Error | null;
}

export const useFetchPortfolioAssets = (portfolioId: number | undefined): ReturnProps => {
	const { data, isLoading, error } = useQuery<PortfolioAsset[], Error>({
		queryKey: ['portfolioAssets', portfolioId],
		queryFn: () => {
			if (!portfolioId) { return Promise.resolve([]) }
			return portfoliosApi.fetchPortfolioAssets(portfolioId)
		},
	})

	return { portfolioAssets: data, isFetching: isLoading, fetchError: error }
}