import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfoliosApi } from '@/services/portfolios';
import { toast } from 'sonner';

interface ReturnProps {
	isEditing: boolean;
	editError: Error | null;
	editPortfolioName: ({ id, name }: { id: number; name: string }) => void;
}

export const useEditPortfolioName = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, { id: number; name: string }>({
		mutationFn: ({ id, name }: { id: number; name: string }) => portfoliosApi.edit(id, name),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
			toast.success(data.message)
		},
		onError: (error, variables) => {
			toast.error(error.message, { action: { label: 'Retry', onClick: () => mutate(variables) }, })
		}
	})

	return { isEditing: isPending, editError: error, editPortfolioName: mutate }
}