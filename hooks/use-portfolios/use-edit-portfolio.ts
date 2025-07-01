import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfoliosApi } from '@/services/portfolios';

interface ReturnProps {
	isEditing: boolean;
	editError: Error | null;
	editPortfolio: ({ id, name }: { id: number; name: string }) => void;
}

export const useEditPortfolio = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, { id: number; name: string }>({
		mutationFn: ({ id, name }: { id: number; name: string }) => portfoliosApi.editPortfolio(id, name),
		onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['portfolios'] }); },
	})

	return { isEditing: isPending, editError: error, editPortfolio: mutate }
}