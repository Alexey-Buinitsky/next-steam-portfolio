import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfoliosApi } from "@/services/portfolios";
import { Portfolio } from '@prisma/client';

interface ReturnProps {
	isCreating: boolean;
	createError: Error | null;
	createPortfolio: (portfolioName: string) => void;
}

export const useCreatePortfolio = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<Portfolio, Error, string>({
		mutationFn: (portfolioName: string) => portfoliosApi.createPortfolio(portfolioName.trim()),
		onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['portfolios'] }); },
	})

	return { isCreating: isPending, createError: error, createPortfolio: mutate }
}