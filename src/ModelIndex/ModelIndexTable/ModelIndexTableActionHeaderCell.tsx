import { TableHeaderCell, TableHeaderCellProps } from '@/Table';

import { ACTION_SLOT } from './constants';

export interface ModelIndexTableActionHeaderCellProps
  extends Omit<TableHeaderCellProps, 'columnId'> {}

export const ModelIndexTableActionHeaderCell = ({
  children,
  className,
  ...props
}: ModelIndexTableActionHeaderCellProps) => {
  return (
    <TableHeaderCell
      className="w-[1%] max-w-24 whitespace-nowrap"
      columnId={ACTION_SLOT}
      {...props}
    >
      {children === undefined ? null : children}
    </TableHeaderCell>
  );
};
