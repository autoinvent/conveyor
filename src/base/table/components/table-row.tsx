import type { ComponentProps } from 'react';

import { useShallow } from 'zustand/shallow';

import { SlotProvider } from '@/base/slot/contexts/slot-context';
import { cn } from '@/base/utils';

import { useTableStore } from '../hooks/use-table-store';

export interface TableRowProps extends ComponentProps<'tr'> {}

export const TableRow = ({
  children,
  className,
  ...htmlProps
}: TableRowProps) => {
  const columnOrder = useTableStore(useShallow((state) => state.columnOrder));
  const Cell = useTableStore((state) => state.components.Cell);

  return (
    <tr
      className={cn(
        'border-y transition-colors hover:bg-muted-subtle',
        className,
      )}
      {...htmlProps}
    >
      <SlotProvider slotIds={columnOrder}>
        {columnOrder.map((column: string) => (
          <Cell key={`table-cell-${column}`} column={column} />
        ))}
        {children}
      </SlotProvider>
    </tr>
  );
};
