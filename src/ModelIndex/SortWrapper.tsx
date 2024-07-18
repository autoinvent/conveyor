import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from '@radix-ui/react-icons';
import type { ComponentProps } from 'react';

import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';

import { Lens, Lenses } from '@/Lenses';

import { SortDirection } from './utils';

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
    <div className={cn('flex items-center', className)}>
      <span className="grow">{children}</span>
      {sortable && (
        <Button
          size="icon"
          variant="outline"
          className="border-none bg-transparent"
          onKeyUp={(e) =>
            e.key === 'Enter' && onNextSortDirection(sortDirection)
          }
          onClick={() => onNextSortDirection(sortDirection)}
        >
          <Lenses activeLens={sortDirection}>
            <Lens lens={SortDirection.ASC}>
              <CaretUpIcon />
            </Lens>
            <Lens lens={SortDirection.DESC}>
              <CaretDownIcon />
            </Lens>
            <Lens lens={SortDirection.NONE}>
              <CaretSortIcon />
            </Lens>
          </Lenses>
        </Button>
      )}
    </div>
  );
};
