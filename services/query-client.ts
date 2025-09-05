import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			retry: 1,
			staleTime: 30 * 1000,
			gcTime: 5 * 60 * 1000,
		},
		mutations: {
			retry: 1,
		},
	},
})