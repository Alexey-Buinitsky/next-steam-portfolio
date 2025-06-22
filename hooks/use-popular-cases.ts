import { useQuery } from "@tanstack/react-query";
import { Asset } from '@prisma/client';
import { apiInstance } from "@/services/api-instance";

export function usePopularCases() {
    return useQuery<Asset[], Error>({
        queryKey: ['popularCases'],
        queryFn: async() => {
            const response = await apiInstance.get('/popular-cases')
            return response.data
        },
        staleTime: 60 * 1000 * 5,
    })
}

