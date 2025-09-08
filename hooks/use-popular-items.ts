// hooks/use-popular-items.ts
import { useQuery } from "@tanstack/react-query";
import { Asset } from '@prisma/client';
import { apiInstance } from "@/services/api-instance";

export type PopularCategory = 'cases' | 'weapons' | 'stickers';

export function usePopularItems(category: PopularCategory, limit: number = 20) {
  return useQuery<Asset[], Error>({
    queryKey: ['popularItems', category, limit],
    queryFn: async () => {
      const response = await apiInstance.get(`/popular-items?category=${category}&limit=${limit}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}