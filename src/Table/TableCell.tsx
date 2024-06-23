import type { ComponentProps } from 'react';

import { TableCell as STableCell } from '@/lib/components/ui/table';

import { useDataStore } from '@/Data';
import { Slot } from '@/Slots';

export interface TableCellProps extends ComponentProps<typeof STableCell> {
  columnId: string;
}

export const TableCell = ({ columnId, children, ...props }: TableCellProps) => {
  const data = useDataStore((state) => state[columnId]);
  const display = typeof data === 'object' ? JSON.stringify(data) : data;
  return (
    <Slot slotKey={columnId}>
      <STableCell {...props}>
        {children === undefined ? display : children}
      </STableCell>
    </Slot>
  );
};
