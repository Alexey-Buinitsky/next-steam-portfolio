import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ItemHistoryResponse } from "@/types/steam";

export function useItemHistory(itemName: string, days: number) {

    return useQuery<ItemHistoryResponse>({
        queryKey: ['itemHistory', itemName, days],

        // queryFn: async () => {
        //     const response = await axios.get(
        //         `/api/item-history?name=${encodeURIComponent(itemName)}&days=${days}`
        //     );
        //     return response.data;
        // },
        // staleTime: 60 * 60 * 1000,
        // enabled: !!itemName
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `/api/item-history?name=${encodeURIComponent(itemName)}&days=${days}`
                );
                
                if (!response.data) {
                    throw new Error('No data received from API');
                }
                
                return response.data;
            } catch (error) {
                console.error('API request failed:', error);
                throw error;
            }
        },
        staleTime: 60 * 60 * 1000,
        enabled: !!itemName,
        retry: 2,
    });
}