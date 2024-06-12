import type { ComponentProps } from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

import { Lens, Lenses } from '@/Lenses';

import { SortDirection } from '../utils';

export interface SortWrapperProps extends ComponentProps<'div'> {
  sortDirection: SortDirection;
  onNextSortDirection: (sortDirection: SortDirection) => void;
  sortable?: boolean;
}

export const SortWrapper = ({
  sortDirection,
  onNextSortDirection,
  sortable = true,
  className,
  children,
}: SortWrapperProps) => {
  return (
    <div className={twMerge('flex items-center', className)}>
      <span className="grow">{children}</span>
      {sortable && (
        <span
          onKeyUp={(e) =>
            e.key === 'Enter' && onNextSortDirection(sortDirection)
          }
          onClick={() => onNextSortDirection(sortDirection)}
        >
          <Lenses activeLens={sortDirection}>
            <Lens lens={SortDirection.ASC}>
              <FaSortUp />
            </Lens>
            <Lens lens={SortDirection.DESC}>
              <FaSortDown />
            </Lens>
            <Lens lens={SortDirection.NONE}>
              <FaSort />
            </Lens>
          </Lenses>
        </span>
      )}
    </div>
  );
};
