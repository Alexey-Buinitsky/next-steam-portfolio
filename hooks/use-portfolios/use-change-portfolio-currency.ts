import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfoliosApi } from '@/services/portfolios';
import { toast } from 'sonner';

interface ReturnProps {
	isChanging: boolean;
	changeError: Error | null;
	changePortfolioCurrency: ({ id, currency }: { id: number; currency: string }) => void;
}

export const useChangePortfolioCurrency = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, { id: number; currency: string }>({
		mutationFn: ({ id, currency }: { id: number; currency: string }) => portfoliosApi.change(id, currency),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
			queryClient.invalidateQueries({ queryKey: ['portfolioAssets', variables.id] })
			toast.success(data.message)
		},
		onError: (error, variables) => {
			toast.error(error.message, { action: { label: 'Retry', onClick: () => mutate(variables) }, })
		}
	})

	return { isChanging: isPending, changeError: error, changePortfolioCurrency: mutate }
}