import { cn } from '@/base/utils';
import type { ComponentProps } from 'react';
import { useTableStore } from '../hooks/use-table-store';
import { useShallow } from 'zustand/shallow';
import { SlotProvider } from '@/base/slot/contexts/slot-context';

export interface TableHeaderRowProps extends ComponentProps<'tr'> {}

export const TableHeaderRow = ({
  children,
  className,
  ...htmlProps
}: TableHeaderRowProps) => {
  const columnIds = useTableStore(useShallow((state) => state.columnIds));
  const TableHead = useTableStore((state) => state.internals.TableHead);

  return (
    <tr className={cn('border-y', className)} {...htmlProps}>
      <SlotProvider slotIds={columnIds}>
        {columnIds.map((columnId) => (
          <TableHead key={`table-head-${columnId}`} columnId={columnId} />
        ))}
        {children}
      </SlotProvider>
    </tr>
  );
};
