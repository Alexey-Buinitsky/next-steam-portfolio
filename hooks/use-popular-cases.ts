import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePopularCases() {
    return useQuery({
        queryKey: ['popularCases'],
        queryFn: async() => {
            const response = await axios.get('/api/popular-cases')
            return response.data
        },
        staleTime: 60 * 1000 * 5,
    })
}