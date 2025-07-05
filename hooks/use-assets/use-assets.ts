import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { apiInstance } from "@/services/api-instance";
import { AssetsResponse, UseAssetsOptions, AssetsApiSearchResponse } from "@/types/portfolio";

// Общая базовая функция для запросов
async function fetchAssets(params: {
  endpoint: 'total-items' | 'search';
  query?: string;
  page?: number;
  skip?: number;
  perPage?: number;
  take?: number;
  type?: string;
  search?: string;
}) {
  const { endpoint, ...rest } = params;
  return apiInstance.get(endpoint === 'total-items' ? '/total-items' : '/search', { params: rest }).then(res => res.data);
}

// Хук для пагинации
export function usePaginatedAssets(options: UseAssetsOptions) {
  return useQuery<AssetsResponse, Error>({
    queryKey: ['assets', 'pagination', options],
    queryFn: () => fetchAssets({
      endpoint: 'total-items',
      page: options.page,
      perPage: options.perPage,
      type: options.type,
      search: options.search
    }),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
  });
}

// Хук для бесконечной подгрузки
export function useInfiniteAssets(query = '', take = 10) {
  return useInfiniteQuery<AssetsApiSearchResponse>({
    queryKey: ['assets', 'infinite', query, take],
    queryFn: ({ pageParam }) => fetchAssets({
      endpoint: 'search',
      query,
      skip: typeof pageParam === 'number' ? pageParam : 0,
      take
    }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;
      return allPages.reduce((total, page) => total + (page.assets?.length || 0), 0);
    },
  });
}