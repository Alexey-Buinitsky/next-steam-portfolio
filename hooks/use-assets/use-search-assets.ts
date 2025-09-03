import { useInfiniteQuery } from '@tanstack/react-query';
import { assetsApi, AssetsApiSearchResponse } from '@/services/assets';

export const useSearchAssets = (query = '', take = 10) => {
	const { data, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage, error, } = useInfiniteQuery<AssetsApiSearchResponse>({
		queryKey: ['searchAssets', query, take],
		queryFn: (context) => {
			const pageParam = typeof context.pageParam === 'number' ? context.pageParam : 0
			return assetsApi.search(query, pageParam, take)
		},
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			if (!lastPage.hasMore) return undefined
			return allPages.reduce((total, page) => total + page.assets.length, 0)
		},
		staleTime: Infinity,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	})

	const assets = data?.pages.flatMap(page => page.assets) || []

	return { assets, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage, error }
}