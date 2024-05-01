import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { Slot } from '@/Slots';
import { humanizeText } from '@/utils';

export interface TableHeaderCellProps
  extends HTMLAttributes<HTMLTableCellElement> {
  columnId: string;
}

export const TableHeaderCell = ({
  columnId,
  children,
  className,
  ...props
}: TableHeaderCellProps) => {
  return (
    <Slot slot={columnId}>
      <th className={twMerge('text-center bg-[--header-color] border border-solid border-[--border-color]', className)} {...props}>
        {children === undefined ? humanizeText(columnId) : children}
      </th>
    </Slot>
  );
};
