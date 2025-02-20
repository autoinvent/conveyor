import { useDataStore } from '@/base/data-store/hooks/use-data-store';
import { cn } from '@/base/utils';
import type { ComponentProps } from 'react';

export interface TableCellProps extends ComponentProps<'td'> {
  columnId: string;
}

export const TableCell = ({
  columnId,
  children,
  className,
  ...htmlProps
}: TableCellProps) => {
  const columnData = useDataStore((state) => state.data?.[columnId]);
  return (
    <td className={cn('px-2 py-1', className)} {...htmlProps}>
      {children === undefined ? columnData : children}
    </td>
  );
};
