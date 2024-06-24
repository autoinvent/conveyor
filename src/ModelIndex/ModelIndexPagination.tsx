import type { ComponentProps } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/lib/components/ui/pagination';

import { useModelIndexStore } from './useModelIndexStore';

export interface ModelIndexPaginationProps
  extends ComponentProps<typeof Pagination> {}

export const ModelIndexPagination = ({
  ...paginationProps
}: ModelIndexPaginationProps) => {
  const fieldsLength = useModelIndexStore((state) => state.fields.length);
  const onTableViewChange = useModelIndexStore(
    (state) => state.onTableViewChange,
  );
  const dataLength = useModelIndexStore((state) => state.data?.length);
  const totalDataLength = useModelIndexStore(
    (state) => state.paginationOptions?.totalDataLength,
  );
  const pageButtonLimit =
    useModelIndexStore((state) => state.paginationOptions?.pageButtonLimit) ??
    10;
  const page = useModelIndexStore((state) => state.tableView?.page) ?? 1;
  const per_page =
    useModelIndexStore((state) => state.tableView?.per_page) ?? 10;

  if (totalDataLength && totalDataLength < 0) {
    throw new Error('totalDataLength cannot be negative.');
  }
  if (pageButtonLimit < 0) {
    throw new Error('pageButtonLimit cannot be negative.');
  }
  if (page < 1) {
    throw new Error('page must be a positive number.');
  }
  if (per_page < 1) {
    throw new Error('per_page must be a positive number.');
  }

  if (
    !fieldsLength ||
    !totalDataLength ||
    !dataLength ||
    pageButtonLimit === 0
  ) {
    return null;
  }

  const totalPages = Math.ceil(totalDataLength / per_page);
  const totalPageSets = Math.ceil(totalPages / pageButtonLimit);
  const currentPageSet = Math.ceil(page / pageButtonLimit);
  const lowerBoundPage = (currentPageSet - 1) * pageButtonLimit + 1;
  const upperBoundPage = Math.min(currentPageSet * pageButtonLimit, totalPages);
  if (page > totalPages || page < 1) {
    throw new Error(`Page must be between 1 and ${totalPages}`);
  }

  return (
    <Pagination {...paginationProps}>
      <PaginationContent>
        {/* Previous Page Set Button */}
        {page > pageButtonLimit && (
          <PaginationItem>
            <PaginationPrevious
              aria-label={`Go to page ${lowerBoundPage - 1}`}
              onClick={() => onTableViewChange?.({ page: lowerBoundPage - 1 })}
            />
          </PaginationItem>
        )}
        {/* Page buttons */}
        {[...Array(upperBoundPage - lowerBoundPage + 1).keys()].map((index) => {
          const buttonPage = index + lowerBoundPage;
          return (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={buttonPage === page}
                onClick={() => onTableViewChange?.({ page: buttonPage })}
              >
                {buttonPage}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {/* Next Page Set Button */}
        {currentPageSet < totalPageSets && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                aria-label={`Go to page ${upperBoundPage + 1}`}
                onClick={() =>
                  onTableViewChange?.({ page: upperBoundPage + 1 })
                }
              />
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <span className="whitespace-nowrap">
            {` Showing items ${per_page * (page - 1) + 1} - ${
              totalPages === page ? totalDataLength : per_page * page
            } of ${totalDataLength}`}
          </span>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
