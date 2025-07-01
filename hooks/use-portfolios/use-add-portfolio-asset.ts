import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfoliosApi } from "@/services/portfolios";
import { Asset } from '@prisma/client';

interface Props {
	portfolioId: number;
	selectedAsset: Asset;
	quantity: number;
	buyPrice: number;
}

interface ReturnProps {
	isAdding: boolean;
	addError: Error | null;
	addPortfolioAsset: (params: Props) => void;
}

export const useAddPortfolioAsset = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, Props>({
		mutationFn: ({ portfolioId, selectedAsset, quantity, buyPrice }) => portfoliosApi.addPortfolioAsset(portfolioId, selectedAsset, quantity, buyPrice),
		onSuccess: (_, variables) => {
			// Инвалидируем и список портфелей, и активы конкретного портфеля
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
			queryClient.invalidateQueries({ queryKey: ['portfolioAssets', variables.portfolioId] })
		},
	})

	return { isAdding: isPending, addError: error, addPortfolioAsset: mutate }
}