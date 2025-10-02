import { useInfiniteQuery } from '@tanstack/react-query';
import { assetsApi } from '@/services/assets';
import { AssetsResponse } from '@/types/portfolio';

export const useFetchInfiniteAssets = (perPage: number, query: string) => {
	
	const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, error } = useInfiniteQuery<AssetsResponse>({
		queryKey: ['infiniteAssets', perPage, query],
		queryFn: (context) => {
			const pageParam = typeof context.pageParam === 'number' ? context.pageParam : 1
			return assetsApi.fetch(pageParam, perPage, query, true)
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => lastPage.pagination.hasMore ? allPages.length + 1 : undefined,
		staleTime: 10 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
		refetchOnWindowFocus: false,
	})

	const assets = data?.pages.flatMap(page => page.assets) || []

	return { assets, isFetching: isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, error }
}