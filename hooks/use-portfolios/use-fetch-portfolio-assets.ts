import { useQuery } from '@tanstack/react-query';
import { portfolioAssetsApi } from '@/services/portfolio-assets';
import { PortfolioAssetWithRelations } from '@/types/portfolio';
import { useAuthCheck } from '@/hooks';

interface ReturnProps {
	portfolioAssets: PortfolioAssetWithRelations[] | undefined;
	isFetching: boolean;
	fetchError: Error | null;
}

export const useFetchPortfolioAssets = (portfolioId: number | undefined): ReturnProps => {
	const { user } = useAuthCheck(); 

	const { data, isLoading, error } = useQuery<PortfolioAssetWithRelations[], Error>({
		queryKey: ['portfolioAssets', portfolioId],
		queryFn: () => {
			if (!portfolioId) { return Promise.resolve([]) }
			return portfolioAssetsApi.fetch(portfolioId)
		},
		enabled: !!user && !!portfolioId,
		refetchInterval: (query) => {
			if (!portfolioId) return false

			const data = query.state.data
			if (!data || data.length === 0) return 3 * 60 * 1000

			return 30 * 1000
		},
		refetchIntervalInBackground: true,
	})

	return { portfolioAssets: data, isFetching: isLoading, fetchError: error }
}