import { cn } from '@/base/utils';
import type { ComponentProps } from 'react';
import type { TableState } from '../types';
import { TableProvider } from '../contexts/TableContext';

export interface TableProps extends TableState, ComponentProps<'table'> {}

export const Table = ({
  columnIds,
  data,
  children,
  className,
  ...htmlTableProps
}: TableProps) => {
  return (
    <TableProvider columnIds={columnIds} data={data}>
      <table
        className={cn('w-auto caption-bottom', className)}
        {...htmlTableProps}
      >
        {children}
      </table>
    </TableProvider>
  );
};
