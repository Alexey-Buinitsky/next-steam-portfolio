'use client'
import React from 'react';
import { PaginationItem, Pagination, PaginationContent, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from '@/components/ui';

interface Props {
	className?: string;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 5;

export const AppPagination: React.FC<Props> = ({ className, currentPage, totalPages, onPageChange }) => {

	let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
	let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

	if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
		startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
	}

	const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

	// const pages = React.useMemo(() => (
	//     Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i) // Использовать в случае большого значения totalPages
	// ), [startPage, endPage]);

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
								</PaginationItem>}
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
								</PaginationItem>}

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