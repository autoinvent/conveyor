import type { ComponentProps } from 'react';

import { TableHeaderRow } from './TableHeaderRow';

export interface TableHeadProps extends ComponentProps<'thead'> {}

export const TableHead = ({
  children,
  className,
  ...htmlProps
}: TableHeadProps) => {
  return (
    <thead className={className} {...htmlProps}>
      {children === undefined ? <TableHeaderRow /> : children}
    </thead>
  );
};
