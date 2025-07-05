import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfoliosApi } from "@/services/portfolios";

interface ReturnProps {
	isCreating: boolean;
	createError: Error | null;
	createPortfolio: (portfolioName: string) => void;
}

export const useCreatePortfolio = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, string>({
		mutationFn: (portfolioName: string) => portfoliosApi.create(portfolioName),
		onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['portfolios'] }); },
	})

	return { isCreating: isPending, createError: error, createPortfolio: mutate }
}