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
  const columnIds = useTableStore(useShallow((state) => state.columnIds));
  const Cell = useTableStore((state) => state.components.Cell);

  return (
    <tr
      className={cn(
        'border-y transition-colors hover:bg-muted-subtle',
        className,
      )}
      {...htmlProps}
    >
      <SlotProvider slotIds={columnIds}>
        {columnIds.map((columnId) => (
          <Cell key={`table-cell-${columnId}`} columnId={columnId} />
        ))}
        {children}
      </SlotProvider>
    </tr>
  );
};
