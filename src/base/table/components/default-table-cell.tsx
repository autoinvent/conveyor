import type { ComponentProps } from 'react';

import { useShallow } from 'zustand/shallow';

import { cn } from '@/base/utils';

import { useTableRowStore } from '../hooks/use-table-row-store';
import { useTableStore } from '../hooks/use-table-store';

export interface DefaultTableCellProps extends ComponentProps<'td'> {
  columnId: string;
}

export const DefaultTableCell = ({
  columnId,
  children,
  className,
  ...htmlProps
}: DefaultTableCellProps) => {
  const rowIndex = useTableRowStore((state) => state.rowIndex);
  const columnData = useTableStore(
    useShallow((state) => state.data?.[rowIndex][columnId]),
  );

  return (
    <td className={cn('px-2 py-1', className)} {...htmlProps}>
      {children === undefined ? columnData : children}
    </td>
  );
};
