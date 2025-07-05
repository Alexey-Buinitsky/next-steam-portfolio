import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioAssetsApi } from "@/services/portfolio-assets";
import { Asset } from '@prisma/client';

interface Props {
	portfolioId: number;
	selectedAsset: Asset;
	quantity: number;
	buyPrice: number;
}

interface ReturnProps {
	isCreating: boolean;
	createError: Error | null;
	createPortfolioAsset: (params: Props) => void;
}

export const useCreatePortfolioAsset = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, Props>({
		mutationFn: ({ portfolioId, selectedAsset, quantity, buyPrice }) => portfolioAssetsApi.create(portfolioId, selectedAsset, quantity, buyPrice),
		onSuccess: (_, variables) => {
			// Инвалидируем и список портфелей, и активы конкретного портфеля
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
			queryClient.invalidateQueries({ queryKey: ['portfolioAssets', variables.portfolioId] })
		},
	})

	return { isCreating: isPending, createError: error, createPortfolioAsset: mutate }
}