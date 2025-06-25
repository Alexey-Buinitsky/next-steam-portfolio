'use client'
import { useState, useEffect } from 'react';
import { useDebounce, useTotalItems } from '@/hooks';
import { MarketItemsDisplayGrid } from './market-items-display-grid';
import { MarketItemsDisplayLine } from './market-items-display-line';
import { MarketItemsHeader } from './market-items-header';
import { AppPagination } from '@/components/shared';
import { tempData } from '@/data/temp-data';

const ITEMS_PER_PAGE = 10

type DisplayMode = 'grid' | 'list'

export function MarketItems() {
	const [page, setPage] = useState(1)
	const [displayMode, setDisplayMode] = useState<DisplayMode>('grid')
	const [searchQuery, setSearchQuery] = useState('')

	const debouncedSearchQuery = useDebounce(searchQuery.trim().toLowerCase(), 500)
	useEffect(() => { setPage(1) }, [debouncedSearchQuery])

	const {data, isLoading, isError} = useTotalItems({ page, perPage: ITEMS_PER_PAGE, search: debouncedSearchQuery })

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

			{data && data.pagination.totalPages > 1 && (
				<AppPagination 
					currentPage={page} onPageChange={setPage} 
					totalPages={data.pagination.totalPages}
				/>
			)}
		</div>
	);
}