import type { ComponentProps } from 'react';

import {
  SPagination,
  SPaginationContent,
  SPaginationEllipsis,
  SPaginationItem,
  SPaginationLink,
  SPaginationNext,
  SPaginationPrevious,
} from '@/lib/components/ui/pagination';

import type { TableView } from '@/types';

export interface PaginationProps
  extends ComponentProps<typeof SPagination>,
    Pick<TableView, 'page' | 'per_page'> {
  totalDataLength?: number;
  onPageChange: (newPage: TableView['page']) => void;
  onPerPageChange: (newPerPage: TableView['per_page']) => void;
  maxPageButtonLimit?: number; // The max number of page btns to show at a time
}

export const Pagination = ({
  totalDataLength = 0,
  page = 1,
  onPageChange,
  per_page = 10,
  onPerPageChange,
  maxPageButtonLimit = 10,
  ...paginationProps
}: PaginationProps) => {
  if (totalDataLength < 0) {
    throw new Error('totalDataLength cannot be a negative number.');
  }

  if (page < 1) {
    throw new Error('page must be a positive number.');
  }
  if (per_page < 1) {
    throw new Error('per_page must be a positive number.');
  }
  if (maxPageButtonLimit < 1) {
    throw new Error('maxPageButtonLimit must be a positive number.');
  }

  if (!totalDataLength) {
    return null;
  }

  const totalPages = Math.ceil(totalDataLength / per_page);
  const totalPageSets = Math.ceil(totalPages / maxPageButtonLimit);
  const currentPageSet = Math.ceil(page / maxPageButtonLimit);
  const lowerBoundPage = (currentPageSet - 1) * maxPageButtonLimit + 1;
  const upperBoundPage = Math.min(
    currentPageSet * maxPageButtonLimit,
    totalPages,
  );
  if (page > totalPages || page < 1) {
    throw new Error(`Page must be between 1 and ${totalPages}`);
  }

  return (
    <SPagination {...paginationProps}>
      <SPaginationContent>
        {/* Previous Page Set Button */}
        {page > maxPageButtonLimit && (
          <SPaginationItem>
            <SPaginationPrevious
              aria-label={`Go to page ${lowerBoundPage - 1}`}
              onClick={() => onPageChange(lowerBoundPage - 1)}
            />
          </SPaginationItem>
        )}
        {/* Page buttons */}
        {[...Array(upperBoundPage - lowerBoundPage + 1).keys()].map((index) => {
          const buttonPage = index + lowerBoundPage;
          return (
            <SPaginationItem key={index}>
              <SPaginationLink
                isActive={buttonPage === page}
                onClick={() => onPageChange(buttonPage)}
              >
                {buttonPage}
              </SPaginationLink>
            </SPaginationItem>
          );
        })}
        {/* Next Page Set Button */}
        {currentPageSet < totalPageSets && (
          <>
            <SPaginationItem>
              <SPaginationEllipsis />
            </SPaginationItem>
            <SPaginationItem>
              <SPaginationNext
                aria-label={`Go to page ${upperBoundPage + 1}`}
                onClick={() => onPageChange(upperBoundPage + 1)}
              />
            </SPaginationItem>
          </>
        )}
        <SPaginationItem>
          <span className="whitespace-nowrap">
            {` Showing items ${per_page * (page - 1) + 1} - ${
              totalPages === page ? totalDataLength : per_page * page
            } of ${totalDataLength}`}
          </span>
        </SPaginationItem>
      </SPaginationContent>
    </SPagination>
  );
};
