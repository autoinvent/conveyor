import { ComponentProps } from 'react';

import { Slot } from '@/Slots';
import { humanizeText } from '@/utils';

export interface TableHeaderCellProps
  extends ComponentProps<"th"> {
  columnId: string;
}

export const TableHeaderCell = ({
  columnId,
  children,
  ...props
}: TableHeaderCellProps) => {
  return (
    <Slot slot={columnId}>
      <th {...props}>
        {children === undefined ? humanizeText(columnId) : children}
      </th>
    </Slot>
  );
};
