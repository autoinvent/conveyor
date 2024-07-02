import type { ComponentProps } from 'react';

import { STableHead } from '@/lib/components/ui/table';

import { Slot } from '@/Slots';
import { humanizeText } from '@/utils';

export interface TableHeaderCellProps
  extends ComponentProps<typeof STableHead> {
  columnId: string;
}

export const TableHeaderCell = ({
  columnId,
  children,
  ...htmlProps
}: TableHeaderCellProps) => {
  return (
    <Slot slotKey={columnId}>
      <STableHead {...htmlProps}>
        {children === undefined ? humanizeText(columnId) : children}
      </STableHead>
    </Slot>
  );
};
