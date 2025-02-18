import type { ComponentProps } from 'react';

import { cn } from '@/base/utils';

import { TableProvider } from '../contexts/table-context';
import type { TableState } from '../types';

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
