import { StaticImageData } from 'next/image'

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
