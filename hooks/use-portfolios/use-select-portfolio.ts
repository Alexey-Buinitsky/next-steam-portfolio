import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfoliosApi } from '@/services/portfolios';
import { Portfolio } from "@prisma/client";

interface Props {
	portfolios: Portfolio[] | undefined;
}

interface MutationContext {
	previousPortfolios?: Portfolio[];
}

interface ReturnProps {
	selectedPortfolio: Portfolio | undefined;
	isSelecting: boolean;
	selectError: Error | null;
	selectPortfolio: (selectedPortfolio: Portfolio) => void;
}

export const useSelectPortfolio = ({ portfolios }: Props): ReturnProps => {
	const queryClient = useQueryClient()

	const selectedPortfolio = portfolios?.find(portfolio => portfolio.isActive)

	const { mutate, isPending, error } = useMutation<Portfolio, Error, Portfolio, MutationContext>({
		mutationFn: (selectedPortfolio: Portfolio) => portfoliosApi.select(selectedPortfolio.id),
		onMutate: async (selectedPortfolio: Portfolio) => {
			// 1. Отменяем текущие запросы
			await queryClient.cancelQueries({ queryKey: ['portfolios'] })
			// 2. Сохраняем предыдущее состояние
			const previousPortfolios = queryClient.getQueryData<Portfolio[]>(['portfolios'])
			// 3. Оптимистичное обновление
			queryClient.setQueryData<Portfolio[]>(['portfolios'], (old) =>
				old?.map(portfolio => ({ ...portfolio, isActive: portfolio.id === selectedPortfolio.id, }))
			)
			return { previousPortfolios }
		},
		onError: (err: Error, _: Portfolio, context?: MutationContext) => {
			// Откатываем изменения при ошибке
			if (context?.previousPortfolios) {
				queryClient.setQueryData(['portfolios'], context.previousPortfolios)
			}
		},
		onSettled: () => {
			// Инвалидируем кеш после мутации (успешной или неудачной)
			queryClient.invalidateQueries({ queryKey: ['portfolios'] })
		},
	})

	return { selectedPortfolio, isSelecting: isPending, selectError: error, selectPortfolio: mutate }
}