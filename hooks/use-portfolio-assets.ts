import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@/services/api-instance';
import { adaptPortfolioAssetToRow } from '@/lib/adaptPortfolioAssetToRow';
import type { IRow } from '@/types/portfolio';

export const usePortfolioAssets = (portfolioId: number | undefined) => {
  return useQuery<IRow[]>({
    queryKey: ['portfolio-assets', portfolioId],
    queryFn: async () => {
      if (!portfolioId) return [];
      const res = await apiInstance.get(`/portfolios/${portfolioId}/assets`);
      console.log(res);
      return res.data.map(adaptPortfolioAssetToRow);
    },
    enabled: !!portfolioId // Запрос выполнится только если есть portfolioId
  });
};

