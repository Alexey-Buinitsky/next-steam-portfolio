import { useQuery } from "@tanstack/react-query";
import { assetsApi, PopularCategory } from "@/services/assets";
import { Asset } from "@prisma/client";

export const useFetchPopularAssets = (category: PopularCategory, limit: number) => {

	const { data, isLoading, error } = useQuery<Asset[], Error>({
		queryKey: ['popularAssets', category, limit],
		queryFn: async () => assetsApi.fetchPopular(category, limit),
		staleTime: Infinity,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	})

	return { data, isLoading, error }
}