import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioAssetsApi } from "@/services/portfolio-assets";
import { PortfolioAssetWithRelations } from '@/types/portfolio';
import { toast } from 'sonner';

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
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
			queryClient.invalidateQueries({ queryKey: ['portfolioAssets', variables.portfolioId] })
			toast.success(data.message)
		},
		onError: (error, variables) => {
			toast.error(error.message, { action: { label: 'Retry', onClick: () => mutate(variables) }, })
		}
	})

	return { isEditing: isPending, editError: error, editPortfolioAsset: mutate }
}