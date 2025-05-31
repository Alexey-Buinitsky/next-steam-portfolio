import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ItemsResponse {
  items: any[];
  total: number;
}

export function usePopularItems(page: number, perPage: number) {
    return useQuery({
        queryKey: ['popularItems', page, perPage],
        queryFn: async() => {
            const response = await axios.get<ItemsResponse>(`/api/popular-items?page=${page}&perPage=${perPage}`)
            return response.data
        },
        staleTime: 60 * 1000 * 5,
    })
}