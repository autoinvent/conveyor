import { HTMLAttributes } from 'react';

import { Slot } from '@/Slots';
import { humanizeText } from '@/utils';

export interface TableHeaderCellProps
  extends HTMLAttributes<HTMLTableCellElement> {
  columnId: string;
}

export const TableHeaderCell = ({
  columnId,
  children,
  ...props
}: TableHeaderCellProps) => {
  return (
    <Slot slot={columnId}>
      <th className='border border-[--border-color]' {...props}>
        {children === undefined ? humanizeText(columnId) : children}
      </th>
    </Slot>
  );
};
