import { type ComponentProps, forwardRef } from 'react';

import { Slot } from '@/Slots';
import { TableHead as STableHead } from '@/lib/components/ui/table';
import { humanizeText } from '@/utils';

export interface TableHeadProps extends ComponentProps<typeof STableHead> {
  columnId: string;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ columnId, children, ...htmlProps }, ref) => {
    return (
      <Slot slotKey={columnId}>
        <STableHead ref={ref} {...htmlProps}>
          {children === undefined ? humanizeText(columnId) : children}
        </STableHead>
      </Slot>
    );
  },
);
