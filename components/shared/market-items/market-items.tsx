'use client'

import { useState, useEffect } from 'react';
import { useDebounce, useTotalItems } from '@/hooks';
import { MarketItemsSkeleton, MarketItemsDisplayGrid, MarketItemsDisplayLine, MarketItemsHeader, AppPagination } from '@/components/shared';

const ITEMS_PER_PAGE = 10

type DisplayMode = 'grid' | 'list'

export const MarketItems: React.FC = () => {
	const [page, setPage] = useState(1)
	const [displayMode, setDisplayMode] = useState<DisplayMode>('grid')
	const [searchQuery, setSearchQuery] = useState('')

	const debouncedSearchQuery = useDebounce(searchQuery.trim().toLowerCase(), 500)
	useEffect(() => { setPage(1) }, [debouncedSearchQuery])

	const {data, isLoading, isError} = useTotalItems({ page, perPage: ITEMS_PER_PAGE, search: debouncedSearchQuery })

	if (isError) {
		return (
		<div className="container mx-auto p-4">
			<div className="text-center py-12">
				<h2 className="text-2xl font-bold text-destructive mb-4">Error loading items</h2>
				<p className="text-muted-foreground">Please try refreshing the page</p>
			</div>
		</div>
		);
	}

	if (isLoading) {
		return <MarketItemsSkeleton displayMode={displayMode} />;
	}

	return (
		<div className="container mx-auto p-4 flex flex-col gap-4">
			<MarketItemsHeader searchQuery={searchQuery} setDisplayMode={setDisplayMode} setSearchQuery={setSearchQuery}/>

			{displayMode === 'grid' 
				? 	(<MarketItemsDisplayGrid data={data}/>) 
				: 	(<MarketItemsDisplayLine data={data}/>)
			}

			{data && data.pagination.totalPages > 1 && (
				<AppPagination 
					currentPage={page} onPageChange={setPage} 
					totalPages={data.pagination.totalPages}
				/>
			)}
		</div>
	)
}