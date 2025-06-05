import { NextResponse } from "next/server";
import { getCsgoMarketItems } from "../csgo-market-api";
import { getFromCache, setToCache } from "@/lib";

const CACHE_KEY_PREFIX = 'csgo-market-history-'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        const days = searchParams.get('days');

        console.log('Request received for item:', name); // Добавляем лог

        if (!name) {
            return NextResponse.json(
                { error: 'Name parameter is required' },
                { status: 400 }
            );
        }

        const cacheKey = `${CACHE_KEY_PREFIX}-${name}-${days}`;
        const cachedData = getFromCache(cacheKey);

        console.log('Fetching fresh data for:', name);
        if (cachedData) {
            console.log('Returning cached data for:', name);
            return NextResponse.json(cachedData);
        }

        const response = await getCsgoMarketItems('/get-item-history', {
            game: 'csgo',
            name,
            days: days || '30'
        });

         if (!response) {
            throw new Error('No response from CSGO Market API');
        }

        setToCache(cacheKey, response);

        return NextResponse.json(response);

    }   catch (error) {
            console.error('History API Error:', error);
            return NextResponse.json(
            { error: 'Failed to fetch price history' },
            { status: 500 }
        );
    }
}