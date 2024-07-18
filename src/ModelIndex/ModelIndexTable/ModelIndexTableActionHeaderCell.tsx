import { cn } from '@/lib/utils';

import { TableHeaderCell, type TableHeaderCellProps } from '@/Table';

import { ACTION_COLUMN } from './constants';

export interface ModelIndexTableActionHeaderCellProps
  extends Omit<TableHeaderCellProps, 'columnId'> {}

export const ModelIndexTableActionHeaderCell = ({
  children,
  className,
  ...props
}: ModelIndexTableActionHeaderCellProps) => {
  return (
    <TableHeaderCell
      className={cn('w-0', className)}
      columnId={ACTION_COLUMN}
      {...props}
    >
      {children === undefined ? null : children}
    </TableHeaderCell>
  );
};
