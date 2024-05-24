import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { TableHeaderRow } from './TableHeaderRow';

export interface TableHeadProps extends ComponentProps<'thead'> {}

export const TableHead = ({
  children,
  className,
  ...props
}: TableHeadProps) => {
  return (
    <thead className={twMerge('rounded', className)} {...props}>
      {children === undefined ? <TableHeaderRow /> : children}
    </thead>
  );
};
