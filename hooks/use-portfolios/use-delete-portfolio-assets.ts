import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioAssetsApi } from "@/services/portfolio-assets";
import { PortfolioAssetWithRelations } from '@/types/portfolio';

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
		onSuccess: (_, variables) => {
			// Инвалидируем и список портфелей, и активы конкретного портфеля
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
			queryClient.invalidateQueries({ queryKey: ['portfolioAssets', variables.portfolioId] })
		},
	})

	return { isDeleting: isPending, deleteError: error, deletePortfolioAssets: mutate }
}