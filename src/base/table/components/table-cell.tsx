import { cn } from '@/base/utils';
import { memo, type ComponentProps } from 'react';
import { useTableRowStore } from '../hooks/use-table-row-store';
import { useTableStore } from '../hooks/use-table-store';
import { useShallow } from 'zustand/shallow';

export interface TableCellProps extends ComponentProps<'td'> {
  columnId: string;
}

export const TableCell = memo(
  ({ columnId, children, className, ...htmlProps }: TableCellProps) => {
    const rowIndex = useTableRowStore((state) => state.rowIndex);
    const columnData = useTableStore(
      useShallow((state) => state.data?.[rowIndex][columnId]),
    );
    return (
      <td className={cn('px-2 py-1', className)} {...htmlProps}>
        {children === undefined ? columnData : children}
      </td>
    );
  },
);
