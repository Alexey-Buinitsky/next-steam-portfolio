'use client'

import React from 'react';
import { useDebounce, useFetchPaginatedAssets } from '@/hooks';
import { MarketItemsSkeleton, MarketItemsDisplayGrid, MarketItemsDisplayLine, MarketItemsHeader, AppPagination } from '@/components/shared';

const ITEMS_PER_PAGE = 10

type DisplayMode = 'grid' | 'list'

export const MarketItems: React.FC = () => {
	const [page, setPage] = React.useState(1)
	const [displayMode, setDisplayMode] = React.useState<DisplayMode>('grid')
	const [searchQuery, setSearchQuery] = React.useState('')

	const debouncedSearchQuery = useDebounce(searchQuery.trim().toLowerCase(), 500)
	React.useEffect(() => { setPage(1) }, [debouncedSearchQuery])

	const { data, isLoading, error } = useFetchPaginatedAssets(page, ITEMS_PER_PAGE, debouncedSearchQuery)

	if (error) {
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
		return <MarketItemsSkeleton/>;
	}

	return (
		<div className="container mx-auto p-4 flex flex-col gap-4">
			<MarketItemsHeader searchQuery={searchQuery} setDisplayMode={setDisplayMode} setSearchQuery={setSearchQuery} />

			{displayMode === 'grid'
				? (<MarketItemsDisplayGrid data={data} />)
				: (<MarketItemsDisplayLine data={data} />)
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