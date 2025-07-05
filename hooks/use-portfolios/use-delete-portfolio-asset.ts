import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioAssetsApi } from "@/services/portfolio-assets";
import { PortfolioAssetWithRelations } from '@/types/portfolio';

interface Props {
	portfolioId: number;
	selectedPortfolioAsset: PortfolioAssetWithRelations;
}

interface ReturnProps {
	isDeleting: boolean;
	deleteError: Error | null;
	deletePortfolioAsset: (params: Props) => void;
}

export const useDeletePortfolioAsset = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, Props>({
		mutationFn: ({ portfolioId, selectedPortfolioAsset }) => portfolioAssetsApi.delete(portfolioId, selectedPortfolioAsset),
		onSuccess: (_, variables) => {
			// Инвалидируем и список портфелей, и активы конкретного портфеля
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
			queryClient.invalidateQueries({ queryKey: ['portfolioAssets', variables.portfolioId] })
		},
	})

	return { isDeleting: isPending, deleteError: error, deletePortfolioAsset: mutate }
}