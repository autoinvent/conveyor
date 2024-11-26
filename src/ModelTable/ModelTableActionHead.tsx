import { TableHead, type TableHeadProps } from '@/Table';

import { ACTION_COLUMN } from './ModelTable';

export interface ModelTableActionHeadProps
  extends Omit<TableHeadProps, 'columnId'> {}

export const ModelTableActionHead = ({
  children,
  ...props
}: ModelTableActionHeadProps) => {
  return (
    <TableHead columnId={ACTION_COLUMN} {...props}>
      {children === undefined ? null : children}
    </TableHead>
  );
};
