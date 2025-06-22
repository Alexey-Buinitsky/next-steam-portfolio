import { StaticImageData } from 'next/image'
import { Asset } from '@prisma/client';

export interface PortfolioAssetWithData {
  id: number;
  quantity: number;
  buyPrice: number;
  asset: {
    id: number;
    name: string;
    imageUrl: string;
    price: number | null;
    type: string;
  };
}

export interface IRow {
  id: string
  icon: string | StaticImageData 
  name: string
  quantity: number
  buyPrice: number
  currentPrice: number
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
