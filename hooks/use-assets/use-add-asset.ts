import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfoliosApi } from "@/services/portfolios";
import { Asset, Portfolio } from '@prisma/client';

interface Props {
	portfolioId: number;
	selectedAsset: Asset;
	quantity: number;
	buyPrice: number;
}

interface ReturnProps {
	isAdding: boolean;
	addError: Error | null;
	addAsset: (params: Props) => void;
}

export const useAddAsset = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<Portfolio, Error, Props>({
		mutationFn: ({ portfolioId, selectedAsset, quantity, buyPrice }) => portfoliosApi.addAsset(portfolioId, selectedAsset, quantity, buyPrice),
		onSuccess: (_, variables) => {
			// Invalidate both portfolios and specific portfolio queries
			queryClient.invalidateQueries({ queryKey: ['portfolios'] });
			queryClient.invalidateQueries({ queryKey: ['portfolio', variables.portfolioId] });
		},
	})

	return { isAdding: isPending, addError: error, addAsset: mutate }
}