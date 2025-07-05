import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioAssetsApi } from "@/services/portfolio-assets";
import { PortfolioAssetWithRelations } from '@/types/portfolio';

interface Props {
	portfolioId: number;
	selectedPortfolioAsset: PortfolioAssetWithRelations;
	quantity: number;
	buyPrice: number;
}

interface ReturnProps {
	isEditing: boolean;
	editError: Error | null;
	editPortfolioAsset: (params: Props) => void;
}

export const useEditPortfolioAsset = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, Props>({
		mutationFn: ({ portfolioId, selectedPortfolioAsset, quantity, buyPrice }) => portfolioAssetsApi.edit(portfolioId, selectedPortfolioAsset, quantity, buyPrice),
		onSuccess: (_, variables) => {
			// Инвалидируем и список портфелей, и активы конкретного портфеля
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
			queryClient.invalidateQueries({ queryKey: ['portfolioAssets', variables.portfolioId] })
		},
	})

	return { isEditing: isPending, editError: error, editPortfolioAsset: mutate }
}