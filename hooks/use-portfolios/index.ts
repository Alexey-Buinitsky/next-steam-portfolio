import { useFetchPortfolios } from './use-fetch-portfolios';
import { useCreatePortfolio } from './use-create-portfolio';
import { useSelectPortfolio } from './use-select-portfolio';
import { useEditPortfolio } from './use-edit-portfolio';
import { useDeletePortfolio } from './use-delete-portfolio';

import { useFetchPortfolioAssets } from './use-fetch-portfolio-assets';
import { useAddPortfolioAsset } from './use-add-portfolio-asset';

export const usePortfolios = () => {
	const { portfolios, isFetching: isFetchingPortfolios, fetchError: portfoliosFetchError } = useFetchPortfolios()
	const { createPortfolio, isCreating, createError } = useCreatePortfolio()
	const { deletePortfolio, isDeleting, deleteError } = useDeletePortfolio()
	const { editPortfolio, isEditing, editError } = useEditPortfolio()
	const { selectedPortfolio, isSelecting, selectError, selectPortfolio } = useSelectPortfolio({ portfolios })

	const { portfolioAssets, isFetching: isFetchingAssets, fetchError: assetsFetchError } = useFetchPortfolioAssets(selectedPortfolio?.id)
	const { isAdding, addError, addPortfolioAsset } = useAddPortfolioAsset()

	const isLoading = isFetchingPortfolios || isCreating || isDeleting || isEditing || isSelecting || isFetchingAssets || isAdding
	const error = portfoliosFetchError || createError || deleteError || editError || selectError || assetsFetchError || addError || null

	return { portfolios, isLoading, error, createPortfolio, deletePortfolio, editPortfolio, selectedPortfolio, selectPortfolio, portfolioAssets, addPortfolioAsset }
}