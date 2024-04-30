import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { TableHeaderRow } from './TableHeaderRow';

export interface TableHeadProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHead = ({ children, className, ...props }: TableHeadProps) => {
  return (
    <thead className={twMerge('rounded bg-[--header-color]', className)} {...props}>
      {children === undefined ? <TableHeaderRow /> : children}
    </thead>
  );
};
