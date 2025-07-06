import { useQuery } from '@tanstack/react-query';
import { portfolioAssetsApi } from '@/services/portfolio-assets';
import { PortfolioAssetWithRelations } from '@/types/portfolio';

interface ReturnProps {
	portfolioAssets: PortfolioAssetWithRelations[] | undefined;
	isFetching: boolean;
	fetchError: Error | null;
}

export const useFetchPortfolioAssets = (portfolioId: number | undefined): ReturnProps => {
	const { data, isLoading, error } = useQuery<PortfolioAssetWithRelations[], Error>({
		queryKey: ['portfolioAssets', portfolioId],
		queryFn: () => {
			if (!portfolioId) { return Promise.resolve([]) }
			return portfolioAssetsApi.fetch(portfolioId)
		},
	})

	return { portfolioAssets: data, isFetching: isLoading, fetchError: error }
}