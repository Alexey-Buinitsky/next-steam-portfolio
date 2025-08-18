import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfoliosApi } from "@/services/portfolios";
import { toast } from 'sonner';

interface ReturnProps {
	isCreating: boolean;
	createError: Error | null;
	createPortfolio: (portfolioName: string) => void;
}

export const useCreatePortfolio = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, string>({
		mutationFn: (portfolioName: string) => portfoliosApi.create(portfolioName),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
			toast.success(data.message)
		},
		onError: (error, portfolioName) => {
			toast.error(error.message, { action: { label: 'Retry', onClick: () => mutate(portfolioName) }, })
		}
	})

	return { isCreating: isPending, createError: error, createPortfolio: mutate }
}