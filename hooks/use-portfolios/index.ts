import { useFetchPortfolios } from './use-fetch-portfolios';
import { useCreatePortfolio } from './use-create-portfolio';
import { useSelectPortfolio } from './use-select-portfolio';
import { useEditPortfolio } from './use-edit-portfolio';
import { useDeletePortfolio } from './use-delete-portfolio';

import { useFetchPortfolioAssets } from './use-fetch-portfolio-assets';
import { useCreatePortfolioAsset } from './use-create-portfolio-asset';
import { useEditPortfolioAsset } from './use-edit-portfolio-asset';
import { useDeletePortfolioAsset } from './use-delete-portfolio-asset';

export const usePortfolios = () => {
	const { portfolios, isFetching: isFetchingPortfolios, fetchError: portfoliosFetchError } = useFetchPortfolios()
	const { createPortfolio, isCreating: isCreatingPortfolio, createError: portfolioCreateError } = useCreatePortfolio()
	const { deletePortfolio, isDeleting: isDeletingPortfolio, deleteError: portfolioDeleteError } = useDeletePortfolio()
	const { editPortfolio, isEditing: isEditingPortfolio, editError: portfolioEditError } = useEditPortfolio()
	const { selectedPortfolio, isSelecting: isSelectingPortfolio, selectError: portfolioSelectError, selectPortfolio } = useSelectPortfolio({ portfolios })

	const { portfolioAssets, isFetching: isFetchingPortfolioAssets, fetchError: portfolioAssetsFetchError } = useFetchPortfolioAssets(selectedPortfolio?.id)
	const { isCreating: isCreatingPortfolioAsset, createError: portfolioAssetCreateError, createPortfolioAsset } = useCreatePortfolioAsset()
	const { isEditing: isEditingPortfolioAsset, editError: portfolioAssetEditError, editPortfolioAsset } = useEditPortfolioAsset()
	const { isDeleting: isDeletingPortfolioAsset, deleteError: portfolioAssetDeleteError, deletePortfolioAsset } = useDeletePortfolioAsset()

	const isLoading = isFetchingPortfolios || isCreatingPortfolio || isDeletingPortfolio || isEditingPortfolio || isSelectingPortfolio
		|| isFetchingPortfolioAssets || isEditingPortfolioAsset || isCreatingPortfolioAsset || isDeletingPortfolioAsset

	const error = portfoliosFetchError || portfolioCreateError || portfolioDeleteError || portfolioEditError || portfolioSelectError
		|| portfolioAssetsFetchError || portfolioAssetCreateError || portfolioAssetEditError || portfolioAssetDeleteError || null

	return {
		portfolios, selectedPortfolio, portfolioAssets,
		isLoading, error,
		createPortfolio, deletePortfolio, editPortfolio, selectPortfolio,
		createPortfolioAsset, editPortfolioAsset, deletePortfolioAsset
	}
}