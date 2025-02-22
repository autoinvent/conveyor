import { cn } from '@/base/utils';
import { type ComponentProps, useMemo } from 'react';
import { useTableStore } from '../hooks/use-table-store';
import { TableCell } from './table-cell';
import { useShallow } from 'zustand/shallow';
import { SlotsProvider } from '@/base/slots/contexts/slots-context';
export interface TableRowProps extends ComponentProps<'tr'> {}

export const TableRow = ({
  children,
  className,
  ...htmlProps
}: TableRowProps) => {
  const columnIds = useTableStore(useShallow((state) => state.columnIds));
  const defaultSlotNodes = useMemo(
    () =>
      Object.fromEntries(
        columnIds.map((columnId) => [
          columnId,
          <TableCell key={`table-cell-${columnId}`} columnId={columnId} />,
        ]),
      ),
    [columnIds],
  );
  return (
    <tr
      className={cn(
        'border-y bg-background transition-colors hover:bg-muted-subtle',
        className,
      )}
      {...htmlProps}
    >
      <SlotsProvider slotIds={columnIds} defaultSlotNodes={defaultSlotNodes}>
        {children}
      </SlotsProvider>
    </tr>
  );
};
