import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfoliosApi } from "@/services/portfolios";

interface ReturnProps {
	isDeleting: boolean;
	deleteError: Error | null;
	deletePortfolio: (id: number) => void;
}

export const useDeletePortfolio = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, number>({
		mutationFn: (id: number) => portfoliosApi.delete(id),
		onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['portfolios'] }); },
	})

	return { isDeleting: isPending, deleteError: error, deletePortfolio: mutate }
}