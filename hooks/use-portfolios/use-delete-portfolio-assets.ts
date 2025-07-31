import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioAssetsApi } from "@/services/portfolio-assets";
import { PortfolioAssetWithRelations } from '@/types/portfolio';
import { toast } from 'sonner';

export interface DeletePortfolioAssetsProps {
	portfolioId: number;
	selectedPortfolioAssets: PortfolioAssetWithRelations[];
}

interface ReturnProps {
	isDeleting: boolean;
	deleteError: Error | null;
	deletePortfolioAssets: (params: DeletePortfolioAssetsProps) => void;
}

export const useDeletePortfolioAssets = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, DeletePortfolioAssetsProps>({
		mutationFn: ({ portfolioId, selectedPortfolioAssets }) => portfolioAssetsApi.delete(portfolioId, selectedPortfolioAssets),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
			queryClient.invalidateQueries({ queryKey: ['portfolioAssets', variables.portfolioId] })
			toast.success(data.message)
		},
		onError: (error, variables) => {
			toast.error(error.message, { action: { label: 'Retry', onClick: () => mutate(variables) }, })
		}
	})

	return { isDeleting: isPending, deleteError: error, deletePortfolioAssets: mutate }
}