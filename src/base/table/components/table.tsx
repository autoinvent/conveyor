import type { ComponentProps } from 'react';

import { cn } from '@/base/utils';

import { TableProvider } from '../contexts/table-context';
import type { TableState } from '../types';
import { TableBody } from './table-body';

export interface TableProps extends TableState, ComponentProps<'table'> {}

export const Table = ({
  columnIds,
  data,
  children,
  className,
  ...htmlProps
}: TableProps) => {
  return (
    <TableProvider columnIds={columnIds} data={data}>
      <table className={cn('w-auto caption-bottom', className)} {...htmlProps}>
        {children === undefined ? <TableBody /> : children}
      </table>
    </TableProvider>
  );
};
