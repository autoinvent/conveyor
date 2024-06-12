import clsx from 'clsx';
import type { ComponentProps } from 'react';
import {
  LuChevronLeft,
  LuChevronRight,
  LuMoreHorizontal,
} from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

import { useModelIndexStore } from './useModelIndexStore';

export interface ModelIndexPaginationProps extends ComponentProps<'nav'> {}

export const ModelIndexPagination = ({
  className,
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
    <nav
      role="navigation"
      aria-label="pagination"
      className={twMerge('mt-2 w-full text-sm', className)}
    >
      <ul className="flex items-center gap-1">
        {/* Previous Page Set Button */}
        {page > pageButtonLimit && (
          <li>
            <button
              type="button"
              className="flex items-center border-none p-0"
              aria-label={`Go to page ${lowerBoundPage - 1}`}
              onClick={() => onTableViewChange?.({ page: lowerBoundPage - 1 })}
            >
              <LuChevronLeft className="h-4 w-4" />
            </button>
          </li>
        )}
        {/* Page buttons */}
        {[...Array(upperBoundPage - lowerBoundPage + 1).keys()].map((index) => {
          const buttonPage = index + lowerBoundPage;
          return (
            <li key={index}>
              <button
                type="button"
                className={twMerge(
                  clsx(
                    'rounded-md hover:bg-[--border-color]',
                    buttonPage === page &&
                      'border-[--success] bg-[--success] hover:border-[--success-dark] hover:bg-[--success-dark]',
                  ),
                )}
                onClick={() => onTableViewChange?.({ page: buttonPage })}
              >
                {buttonPage}
              </button>
            </li>
          );
        })}
        {/* Next Page Set Button */}
        {currentPageSet < totalPageSets && (
          <>
            <li>
              <LuMoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More Pages</span>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center border-none p-0"
                aria-label={`Go to page ${upperBoundPage + 1}`}
                onClick={() =>
                  onTableViewChange?.({ page: upperBoundPage + 1 })
                }
              >
                <LuChevronRight className="h-4 w-4" />
              </button>
            </li>
          </>
        )}
        <li>
          <span>
            {` Showing items ${per_page * (page - 1) + 1} - ${
              totalPages === page ? totalDataLength : per_page * page
            } of ${totalDataLength}`}
          </span>
        </li>
      </ul>
    </nav>
  );
};
