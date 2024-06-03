import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { Slot } from '@/Slots';
import { humanizeText } from '@/utils';

export interface TableHeaderCellProps extends ComponentProps<'th'> {
  columnId: string;
}

export const TableHeaderCell = ({
  columnId,
  children,
  className,
  ...htmlProps
}: TableHeaderCellProps) => {
  return (
    <Slot slotKey={columnId}>
      <th
        className={twMerge(
          'border border-[--border-color] bg-[--header-color] p-1.5',
          className,
        )}
        {...htmlProps}
      >
        {children === undefined ? humanizeText(columnId) : children}
      </th>
    </Slot>
  );
};
