import type { ComponentProps } from 'react';

import { TableHead as STableHeaderCell } from '@/lib/components/ui/table';

import { Slot } from '@/Slots';
import { humanizeText } from '@/utils';

export interface TableHeaderCellProps
  extends ComponentProps<typeof STableHeaderCell> {
  columnId: string;
}

export const TableHeaderCell = ({
  columnId,
  children,
  ...htmlProps
}: TableHeaderCellProps) => {
  return (
    <Slot slotKey={columnId}>
      <STableHeaderCell {...htmlProps}>
        {children === undefined ? humanizeText(columnId) : children}
      </STableHeaderCell>
    </Slot>
  );
};
