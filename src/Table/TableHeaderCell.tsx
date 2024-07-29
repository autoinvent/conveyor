import { type ComponentProps, forwardRef } from 'react';

import { STableHead } from '@/lib/components/ui/table';

import { Slot } from '@/Slots';
import { humanizeText } from '@/utils';

export interface TableHeaderCellProps
  extends ComponentProps<typeof STableHead> {
  columnId: string;
}

export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(({ columnId, children, ...htmlProps }, ref) => {
  return (
    <Slot slotKey={columnId}>
      <STableHead ref={ref} {...htmlProps}>
        {children === undefined ? humanizeText(columnId) : children}
      </STableHead>
    </Slot>
  );
});
