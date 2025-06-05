'use client'
import { useState, useEffect } from 'react';
import { useDebounce, useMarketItems } from '@/hooks';
import { MarketItemsDisplayGrid } from './market-items-display-grid';
import { MarketItemsDisplayLine } from './market-items-display-line';
import { MarketItemsHeader } from './market-items-header';
import { AppPagination } from '@/components/shared';

const ITEMS_PER_PAGE = 10
const MAX_PAGES = 50

type DisplayMode = 'grid' | 'list'

export function MarketItems() {
	const [currentPage, setCurrentPage] = useState(1)
	const [displayMode, setDisplayMode] = useState<DisplayMode>('grid')
	const [searchQuery, setSearchQuery] = useState('')

	const debouncedSearchQuery = useDebounce(searchQuery.trim().toLowerCase(), 1000)

	useEffect(() => { setCurrentPage(1) }, [searchQuery])

	const { data, isLoading, isError } = useMarketItems( currentPage, ITEMS_PER_PAGE, debouncedSearchQuery )

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error loading items</div>

	return (
		<div className="container mx-auto p-4">
			<MarketItemsHeader searchQuery={searchQuery} setDisplayMode={setDisplayMode} setSearchQuery={setSearchQuery}/>

			{displayMode === 'grid' ? (
				<MarketItemsDisplayGrid data={data} />
			) : (
				<MarketItemsDisplayLine data={data}/>
			)}

			<AppPagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={Math.min(MAX_PAGES, Math.ceil((data?.total || 0) / ITEMS_PER_PAGE))}/>
		</div>
	);
}