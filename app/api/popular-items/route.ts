import { NextResponse } from "next/server";
import { getFromCache } from "@/lib/cache";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '0');
        const perPage = parseInt(searchParams.get('perPage') || '10');

        const cacheKey = `steam-items-page-${page}`;
        const cachedItems = getFromCache(cacheKey);

        if (!cachedItems) {
            return NextResponse.json(
                { error: 'Данные ещё не загружены' },
                { status: 404 }
            );
        }

        const paginatedItems = cachedItems.slice(0, perPage);

        return NextResponse.json({
            items: paginatedItems,
            total: cachedItems.length
        });
    } catch (error) {
        console.error('Ошибка API:', error);
        return NextResponse.json(
            { error: 'Ошибка сервера' },
            { status: 500 }
        );
    }
}