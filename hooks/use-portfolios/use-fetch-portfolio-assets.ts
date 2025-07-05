import { useQuery } from '@tanstack/react-query';
import { portfolioAssetsApi } from '@/services/portfolio-assets';
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
			return portfolioAssetsApi.fetch(portfolioId)
		},
	})

	return { portfolioAssets: data, isFetching: isLoading, fetchError: error }
}