import { NextResponse } from "next/server";
import { getSteamItems } from "../steam-api";
import { formatItem } from "@/lib/format-item";
import { FormattedItem } from "@/types/steam";
import { getFromCache, setToCache } from "@/lib/cache";

const CACHE_KEY = 'steam-popular-cases';

export async function GET() {
  try {
    const cachedData = getFromCache(CACHE_KEY);

    if(cachedData) {
        return NextResponse.json(cachedData);
    }
    
    const response = await getSteamItems({
        "category_730_Type[]": 'tag_CSGO_Type_WeaponCase',
        query: 'case',
        count: 50, // sort не работает совместно с count
        sort_column: 'popular',
        sort_dir: 'desc'
    });

    const formattedData = response.data?.results?.map(formatItem).sort((a: FormattedItem, b: FormattedItem) => (b.volume || 0) - (a.volume || 0)) || [];

    setToCache(CACHE_KEY, formattedData);
    return NextResponse.json(formattedData);
    
  } catch (error) {
    console.error('Cases API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}