import type { ComponentProps } from 'react';

import { useShallow } from 'zustand/shallow';

import { SlotProvider } from '@/base/slot/contexts/slot-context';
import { cn } from '@/base/utils';

import { useTableStore } from '../hooks/use-table-store';

export interface TableHeaderRowProps extends ComponentProps<'tr'> {}

export const TableHeaderRow = ({
  children,
  className,
  ...htmlProps
}: TableHeaderRowProps) => {
  const columnOrder = useTableStore(useShallow((state) => state.columnOrder));
  const Head = useTableStore((state) => state.components.Head);

  return (
    <tr className={cn('border-y', className)} {...htmlProps}>
      <SlotProvider slotIds={columnOrder}>
        {columnOrder.map((column: string) => (
          <Head key={`table-head-${column}`} columnId={column} />
        ))}
        {children}
      </SlotProvider>
    </tr>
  );
};
