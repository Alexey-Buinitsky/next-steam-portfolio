import { useQuery } from "@tanstack/react-query";
import { assetsApi } from "@/services/assets";
import { AssetsResponse } from "@/types/portfolio";

export const useFetchPaginatedAssets = (page: number, perPage: number, query: string) => {

	const { data, isLoading, error } = useQuery<AssetsResponse, Error>({
		queryKey: ['paginatedAssets', page, perPage, query],
		queryFn: async () => assetsApi.fetch(page, perPage, query),
		placeholderData: (previousData) => previousData,
		staleTime: 24 * 60 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	})

	return { data, isLoading, error }
}