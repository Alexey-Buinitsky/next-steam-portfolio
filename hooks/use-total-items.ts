import { useQuery } from "@tanstack/react-query";
import { AssetsResponse, UseAssetsOptions } from "@/types/portfolio";
import { apiInstance } from "@/services/api-instance";

export function useTotalItems({page = 1, perPage = 10, type, search}: UseAssetsOptions = {}) {
  return useQuery<AssetsResponse, Error>({
    queryKey: ['assets', { page, perPage, type, search }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('perPage', perPage.toString());
      if (type) params.append('type', type);
      if (search) params.append('search', search);

      const response = await apiInstance.get(`/total-items?${params.toString()}`);
      return response.data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 60 * 1000 * 5, // 5 минут
  });
}