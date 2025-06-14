import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useTotalItems = () => {
  return useQuery({
    queryKey: ['totalItems'],
    queryFn: async () => {
      const { data } = await axios.get('/api/total-items');
      return data.items;
    },
    staleTime: 24 * 60 * 60 * 1000 // 24 часа
  });
};