import { useFetchPortfolios } from './use-fetch-portfolios';
import { useCreatePortfolio } from './use-create-portfolio';
import { useSelectPortfolio } from './use-select-portfolio';
import { useEditPortfolioName } from './use-edit-portfolio-name';
import { useChangePortfolioCurrency } from './use-change-portfolio-currency';
import { useDeletePortfolio } from './use-delete-portfolio';

import { useFetchPortfolioAssets } from './use-fetch-portfolio-assets';
import { useCreatePortfolioAsset } from './use-create-portfolio-asset';
import { useEditPortfolioAsset } from './use-edit-portfolio-asset';
import { useDeletePortfolioAssets } from './use-delete-portfolio-assets';

export type { CreatePortfolioAssetProps } from './use-create-portfolio-asset';
export type { DeletePortfolioAssetsProps } from './use-delete-portfolio-assets';

export const usePortfolios = () => {
	const { portfolios, isFetching: isFetchingPortfolios, fetchError: portfoliosFetchError } = useFetchPortfolios()
	const { createPortfolio, isCreating: isCreatingPortfolio, createError: portfolioCreateError } = useCreatePortfolio()
	const { deletePortfolio, isDeleting: isDeletingPortfolio, deleteError: portfolioDeleteError } = useDeletePortfolio()
	const { editPortfolioName, isEditing: isEditingPortfolioName, editError: portfolioNameEditError } = useEditPortfolioName()
	const { changePortfolioCurrency, isChanging: isChangingPortfolioCurrency, changeError: portfolioCurrencyChangeError } = useChangePortfolioCurrency()
	const { selectedPortfolio, isSelecting: isSelectingPortfolio, selectError: portfolioSelectError, selectPortfolio } = useSelectPortfolio({ portfolios })


	const { portfolioAssets, isFetching: isFetchingPortfolioAssets, fetchError: portfolioAssetsFetchError } = useFetchPortfolioAssets(selectedPortfolio?.id)
	const { isCreating: isCreatingPortfolioAsset, createError: portfolioAssetCreateError, createPortfolioAsset } = useCreatePortfolioAsset()
	const { isEditing: isEditingPortfolioAsset, editError: portfolioAssetEditError, editPortfolioAsset } = useEditPortfolioAsset()
	const { isDeleting: isDeletingPortfolioAssets, deleteError: portfolioAssetsDeleteError, deletePortfolioAssets } = useDeletePortfolioAssets()

	const isLoading = isFetchingPortfolios || isCreatingPortfolio || isDeletingPortfolio || isEditingPortfolioName || isSelectingPortfolio || isChangingPortfolioCurrency
		|| isFetchingPortfolioAssets || isEditingPortfolioAsset || isCreatingPortfolioAsset || isDeletingPortfolioAssets

	const error = portfoliosFetchError || portfolioCreateError || portfolioDeleteError || portfolioNameEditError || portfolioSelectError || portfolioCurrencyChangeError
		|| portfolioAssetsFetchError || portfolioAssetCreateError || portfolioAssetEditError || portfolioAssetsDeleteError || null

	return {
		portfolios, selectedPortfolio, portfolioAssets,
		isLoading, error,
		createPortfolio, deletePortfolio, editPortfolioName, selectPortfolio, changePortfolioCurrency,
		createPortfolioAsset, editPortfolioAsset, deletePortfolioAssets
	}
}