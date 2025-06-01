import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { FormattedItem } from "@/types/steam";

interface ItemsResponse {
  items: FormattedItem[];
  total: number;
}

export function useMarketItems(page: number, perPage: number, query?: string) {
    return useQuery({
        queryKey: ['marketItems', page, perPage, query],
        queryFn: async() => {
            const endpoint = query ? '/api/search-items' : '/api/popular-items'
            const response = await axios.get<ItemsResponse>(`${endpoint}?page=${page}&perPage=${perPage}${query ? `&query=${encodeURIComponent(query)}` : ''}`)
            return response.data
        },
        staleTime: 60 * 1000 * 5,
    })
}