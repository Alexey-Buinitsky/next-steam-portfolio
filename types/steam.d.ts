export interface SteamMarketItem {
  appid?: number;
  hash_name?: string;
  name?: string;
  sell_price?: number;
  sell_listings?: number;
  market_hash_name?: string;
  asset_description: {
    icon_url?: string;
  };
}

export interface FormattedItem {
    id: string;
    name: string;
    price: number;
    image: string;
    volume?: number;
}

export interface SteamMarketResponse {
  success: boolean;
  start: number;
  pagesize: number;
  total_count: number;
  results: SteamMarketItem[];
}

export interface ItemHistoryResponse {
  time: string[];
  price: string[];
  volume: string[];
}

//api
export interface ItemsResponse {
  items: FormattedItem[];
  total: number;
}

