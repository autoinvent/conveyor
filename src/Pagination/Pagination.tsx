import type { ComponentProps } from 'react';

import { SelectInput } from '@/BasicInputs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';
import { cn } from '@/lib/utils';
import type { TableView } from '@/types';

import * as Shadcn from '../lib/components/ui/pagination';

export interface PaginationProps
  extends ComponentProps<typeof Shadcn.Pagination>,
    Pick<TableView, 'page'> {
  totalDataLength?: number;
  perPage?: TableView['perPage'];
  maxPageButtonLimit?: number; // The max number of page btns to show at a time
  onPageChange: (newPage: TableView['page']) => void;
  onPerPageChange?: (newPerPage: TableView['perPage']) => void;
  perPageOptions?: typeof PER_PAGE_VALUES;
}

const PER_PAGE_VALUES = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

export const Pagination = ({
  totalDataLength = 0,
  page = 1,
  perPage = 10,
  maxPageButtonLimit = 10,
  onPageChange,
  onPerPageChange,
  perPageOptions = PER_PAGE_VALUES,
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

  // Total number of pages that can be tabbed through
  const totalPages = Math.ceil(totalDataLength / perPage);
  // Total number of sets of pages (so how many sets of 5 can you go thru for example)
  const totalPageSets = Math.ceil(totalPages / maxPageButtonLimit);
  // Which page set we're on
  const currentPageSet = Math.ceil(page / maxPageButtonLimit);
  // lowest page of the page sets we are on
  const lowerBoundPage = (currentPageSet - 1) * maxPageButtonLimit + 1;
  // highest page of the page set we are on
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
        {/* Items per page */}
        {onPerPageChange && (
          <>
            <Shadcn.PaginationItem>
              <span className="whitespace-nowrap pr-1 font-medium text-sm">
                Rows per page:
              </span>
            </Shadcn.PaginationItem>
            <Select
              value={String(perPage)}
              onValueChange={(value) => {
                onPageChange(1);
                onPerPageChange(Number(value));
              }}
            >
              <SelectTrigger className="mr-2 h-8 w-[4.5rem]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {perPageOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={String(value)}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        )}
        <Shadcn.PaginationItem>
          <span className="flex items-center justify-center whitespace-nowrap font-medium text-sm">
            {` Showing items ${perPage * (page - 1) + 1} - ${
              totalPages === page ? totalDataLength : perPage * page
            } of ${totalDataLength}`}
          </span>
        </Shadcn.PaginationItem>
      </Shadcn.PaginationContent>
    </Shadcn.Pagination>
  );
};
