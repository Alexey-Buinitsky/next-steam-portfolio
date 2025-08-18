import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioAssetsApi } from "@/services/portfolio-assets";
import { Asset } from '@prisma/client';
import { toast } from 'sonner';

export interface CreatePortfolioAssetProps {
	portfolioId: number;
	selectedAsset: Asset;
	quantity: number;
	buyPrice: number;
}

interface ReturnProps {
	isCreating: boolean;
	createError: Error | null;
	createPortfolioAsset: (params: CreatePortfolioAssetProps) => void;
}

export const useCreatePortfolioAsset = (): ReturnProps => {
	const queryClient = useQueryClient()

	const { mutate, isPending, error } = useMutation<{ message: string }, Error, CreatePortfolioAssetProps>({
		mutationFn: ({ portfolioId, selectedAsset, quantity, buyPrice }) => portfolioAssetsApi.create(portfolioId, selectedAsset, quantity, buyPrice),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
			queryClient.invalidateQueries({ queryKey: ['portfolioAssets', variables.portfolioId] })
			toast.success(data.message)
		},
		onError: (error, variables) => {
			toast.error(error.message, { action: { label: 'Retry', onClick: () => mutate(variables) }, })
		}
	})

	return { isCreating: isPending, createError: error, createPortfolioAsset: mutate }
}