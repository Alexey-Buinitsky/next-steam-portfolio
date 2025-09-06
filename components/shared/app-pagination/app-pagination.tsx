'use client'

import React from 'react';
import { PaginationItem, Pagination, PaginationContent, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from '@/components/ui';

interface Props {
	className?: string;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const AppPagination: React.FC<Props> = ({ className, currentPage, totalPages, onPageChange }) => {
	const [maxVisiblePages, setMaxVisiblePages] = React.useState(5)

	React.useEffect(() => {
		const handleResize = () => {
			setMaxVisiblePages(window.innerWidth < 768 ? 3 : 5)
		}
		window.addEventListener('resize', handleResize)
		handleResize()
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
	let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

	if (endPage - startPage + 1 < maxVisiblePages) {
		startPage = Math.max(1, endPage - maxVisiblePages + 1)
	}

	const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

	// Использовать в случае большого значения totalPages
	// const pages = React.useMemo(() => (
	//     Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i) 
	// ), [startPage, endPage])

	return (
		<div className={className}>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); onPageChange(Math.max(1, currentPage - 1)) }} />
					</PaginationItem>

					{startPage > 1 && (
						<>
							<PaginationItem onClick={() => onPageChange(1)}>
								<PaginationLink>1</PaginationLink>
							</PaginationItem>
							{startPage > 2 &&
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							}
						</>
					)}

					{pages.map((page) => (
						<PaginationItem key={page} onClick={() => page !== currentPage && onPageChange(page)}>
							<PaginationLink isActive={page === currentPage}>{page}</PaginationLink>
						</PaginationItem>
					))}

					{endPage < totalPages && (
						<>
							{endPage < totalPages - 1 &&
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							}
							<PaginationItem onClick={() => onPageChange(totalPages)}>
								<PaginationLink>{totalPages}</PaginationLink>
							</PaginationItem>
						</>
					)}

					<PaginationItem>
						<PaginationNext href="#" onClick={(e) => { e.preventDefault(); onPageChange(Math.min(totalPages, currentPage + 1)) }} />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}