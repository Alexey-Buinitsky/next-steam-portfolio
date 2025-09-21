'use client'

import React from 'react';
import { PaginationItem, Pagination, PaginationContent, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui';

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
	const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

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
						<PaginationPrevious 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); onPageChange(Math.max(1, currentPage - 1)) }} 
                             className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl h-9 2k:h-12 4k:h-18 8k:h-36 px-3 2k:px-4 4k:px-6 8k:px-12 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:2k:w-5 [&>svg]:2k:h-5 [&>svg]:4k:w-8 [&>svg]:4k:h-8 [&>svg]:8k:w-16 [&>svg]:8k:h-16"
                        />
					</PaginationItem>

					{startPage > 1 && (
						<>
							<PaginationItem onClick={() => onPageChange(1)}>
								<PaginationLink className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl h-9 2k:h-12 4k:h-18 8k:h-36 px-3 2k:px-4 4k:px-6 8k:px-12">1</PaginationLink>
							</PaginationItem>
							{startPage > 2 &&
								<PaginationItem>
									<p className='text-lg 2k:text-xl 4k:text-3xl 8k:text-6xl px-3 2k:px-5 4k:px-8 8k:px-16'>...</p>
								</PaginationItem>
							}
						</>
					)}

					{pages.map((page) => (
						<PaginationItem key={page} onClick={() => page !== currentPage && onPageChange(page)}>
							<PaginationLink 
                                isActive={page === currentPage}
                                className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl h-9 2k:h-12 4k:h-18 8k:h-36 px-3 2k:px-4 4k:px-6 8k:px-12"
                            >
                                {page}
                            </PaginationLink>
						</PaginationItem>
					))}

					{endPage < totalPages && (
						<>
							{endPage < totalPages - 1 &&
								<PaginationItem>
									<p className='text-lg 2k:text-xl 4k:text-3xl 8k:text-6xl px-3 2k:px-5 4k:px-8 8k:px-16'>...</p>
								</PaginationItem>
							}
							<PaginationItem onClick={() => onPageChange(totalPages)}>
								<PaginationLink className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl h-9 2k:h-12 4k:h-18 8k:h-36 px-3 2k:px-4 4k:px-6 8k:px-12">{totalPages}</PaginationLink>
							</PaginationItem>
						</>
					)}

					<PaginationItem>
						<PaginationNext 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); onPageChange(Math.min(totalPages, currentPage + 1)) }} 
                             className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl h-9 2k:h-12 4k:h-18 8k:h-36 px-3 2k:px-4 4k:px-6 8k:px-12 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:2k:w-5 [&>svg]:2k:h-5 [&>svg]:4k:w-8 [&>svg]:4k:h-8 [&>svg]:8k:w-16 [&>svg]:8k:h-16"
                        />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}