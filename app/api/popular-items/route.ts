import { NextResponse } from "next/server";
import { getSteamItems } from "../steam-api";
import { getFromCache, setToCache } from "@/lib/cache";
import { formatItem } from "@/lib/format-item";

const CACHE_KEY_PREFIX = 'steam-popular-items-';

export async function GET (request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('perPage') || '10');
        const start = (page - 1) * perPage;

        const cacheKey = `${CACHE_KEY_PREFIX}${page}-${perPage}`;
        const cachedData = getFromCache(cacheKey);

        if(cachedData) {
            return NextResponse.json(cachedData);
        }

        const response = await getSteamItems({
            start,
            count: perPage,
            sort_column: 'popular',
            sort_dir: 'desc'
        });

        const formattedData = response.data?.results?.map(formatItem) || [];

        setToCache(cacheKey, {
            items: formattedData,
            total: response.data?.total_count || 0
        }); 
        
        return NextResponse.json({
            items: formattedData,
            total: response.data?.total_count || 0
        });

    } catch (error) {
        console.error('Items API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch items' },
            { status: 500 }
        );
    }
} 