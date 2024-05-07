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
    <TableHeaderCell columnId={ACTION_SLOT} {...props}>
      {children === undefined ? null : children}
    </TableHeaderCell>
  );
};
