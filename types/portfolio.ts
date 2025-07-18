import { Asset, Portfolio, PortfolioAsset } from '@prisma/client';

export type PortfolioAssetWithRelations = PortfolioAsset & {
	asset: Asset,
	portfolio: Portfolio,
}

export interface AssetsResponse {
  assets: Asset[];
  pagination: {
    currentPage: number;
    totalPages: number; 
    totalCount: number;
    perPage: number;
  };
}

export interface UseAssetsOptions {
  page?: number;
  perPage?: number;
  type?: string;
  search?: string;
}

export interface AssetsApiSearchResponse {
  assets: Asset[];
  hasMore: boolean;
}