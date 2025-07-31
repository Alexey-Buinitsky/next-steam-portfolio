import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfoliosApi } from "@/services/portfolios";
import { toast } from 'sonner';

interface ReturnProps {
	isDeleting: boolean;
	deleteError: Error | null;
	deletePortfolio: (id: number) => void;
}

export const useDeletePortfolio = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, number>({
		mutationFn: (id: number) => portfoliosApi.delete(id),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
			toast.success(data.message)
		},
		onError: (error, id) => {
			toast.error(error.message, { action: { label: 'Retry', onClick: () => mutate(id) }, })
		}
	})

	return { isDeleting: isPending, deleteError: error, deletePortfolio: mutate }
}