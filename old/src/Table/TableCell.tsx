import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { useDataStore } from '@/Data';
import { Slot } from '@/Slots';
import { TableCell as STableCell } from '@/lib/components/ui/table';

export interface TableCellProps
  extends ComponentPropsWithoutRef<typeof STableCell> {
  columnId: string;
}

export const TableCell = forwardRef<
  ElementRef<typeof STableCell>,
  TableCellProps
>(({ columnId, children, ...props }, ref) => {
  const data = useDataStore((state) => state[columnId]);
  const display = typeof data === 'object' ? JSON.stringify(data) : data;
  return (
    <Slot slotKey={columnId}>
      <STableCell ref={ref} {...props}>
        {children === undefined ? display : children}
      </STableCell>
    </Slot>
  );
});
