export interface SteamMarketItem {
  name?: string;
  hash_name?: string;
  sell_listings?: number;
  sell_price?: number;
  sell_price_text?: string;
  app_icon?: string,
  app_name?: string,
  market_hash_name?: string;
  asset_description?: {
    appid?: number,
    classid?: string,
    instanceid?: string,
    background_color?: string,
    icon_url?: string,
    tradable?: number,
    name?: string,
    name_color?: string,
    type?: string,
    market_name?: string,
    market_hash_name?: string,
    commodity?: number
  };
  sale_price_text?: string
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

