import { useFetchPortfolios } from './use-fetch-portfolios';
import { useCreatePortfolio } from './use-create-portfolio';
import { useSelectPortfolio } from './use-select-portfolio';
import { useEditPortfolio } from './use-edit-portfolio';
import { useDeletePortfolio } from './use-delete-portfolio';

export const usePortfolios = () => {
	const { portfolios, isFetching, fetchError } = useFetchPortfolios()
	const { createPortfolio, isCreating, createError } = useCreatePortfolio()
	const { deletePortfolio, isDeleting, deleteError } = useDeletePortfolio()
	const { editPortfolio, isEditing, editError } = useEditPortfolio()
	const { selectedPortfolio, isSelecting, selectError, selectPortfolio } = useSelectPortfolio({ portfolios })

	const isLoading = isFetching || isCreating || isDeleting || isEditing || isSelecting
	const error = fetchError || createError || deleteError || editError || selectError || null

	return { portfolios, isLoading, error, createPortfolio, deletePortfolio, editPortfolio, selectedPortfolio, selectPortfolio }
}