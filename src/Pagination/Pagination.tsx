import type { ComponentProps } from 'react';

import * as Shadcn from '@/lib/components/ui/pagination';
import { cn } from '@/lib/utils';
import type { TableView } from '@/types';

export interface PaginationProps
  extends ComponentProps<'nav'>,
    Pick<TableView, 'page'> {
  totalDataLength?: number;
  perPage?: TableView['per_page'];
  maxPageButtonLimit?: number; // The max number of page btns to show at a time
  onPageChange: (newPage: TableView['page']) => void;
  onPerPageChange?: (newPerPage: TableView['per_page']) => void;
}

export const Pagination = ({
  totalDataLength = 0,
  page = 1,
  perPage = 10,
  maxPageButtonLimit = 10,
  onPageChange,
  onPerPageChange,
  className,
  ...paginationProps
}: PaginationProps) => {
  if (totalDataLength < 0) {
    throw new Error('totalDataLength cannot be a negative number.');
  }

  if (page < 1) {
    throw new Error('page must be a positive number.');
  }
  if (perPage < 1) {
    throw new Error('perPage must be a positive number.');
  }
  if (maxPageButtonLimit < 1) {
    throw new Error('maxPageButtonLimit must be a positive number.');
  }

  if (!totalDataLength) {
    return null;
  }

  const totalPages = Math.ceil(totalDataLength / perPage);
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
    <Shadcn.Pagination className={cn('py-2', className)} {...paginationProps}>
      <Shadcn.PaginationContent>
        {/* Previous Page Set Button */}
        {page > maxPageButtonLimit && (
          <Shadcn.PaginationItem>
            <Shadcn.PaginationPrevious
              aria-label={`Go to page ${lowerBoundPage - 1}`}
              onClick={() => onPageChange(lowerBoundPage - 1)}
            />
          </Shadcn.PaginationItem>
        )}
        {/* Page buttons */}
        {[...Array(upperBoundPage - lowerBoundPage + 1).keys()].map((index) => {
          const buttonPage = index + lowerBoundPage;
          return (
            <Shadcn.PaginationItem key={index}>
              <Shadcn.PaginationLink
                isActive={buttonPage === page}
                onClick={() => onPageChange(buttonPage)}
              >
                {buttonPage}
              </Shadcn.PaginationLink>
            </Shadcn.PaginationItem>
          );
        })}
        {/* Next Page Set Button */}
        {currentPageSet < totalPageSets && (
          <>
            <Shadcn.PaginationItem>
              <Shadcn.PaginationEllipsis />
            </Shadcn.PaginationItem>
            <Shadcn.PaginationItem>
              <Shadcn.PaginationNext
                aria-label={`Go to page ${upperBoundPage + 1}`}
                onClick={() => onPageChange(upperBoundPage + 1)}
              />
            </Shadcn.PaginationItem>
          </>
        )}
        <Shadcn.PaginationItem>
          <span className="whitespace-nowrap">
            {` Showing items ${perPage * (page - 1) + 1} - ${
              totalPages === page ? totalDataLength : perPage * page
            } of ${totalDataLength}`}
          </span>
        </Shadcn.PaginationItem>
      </Shadcn.PaginationContent>
    </Shadcn.Pagination>
  );
};
