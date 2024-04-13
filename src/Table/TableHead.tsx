import { HTMLAttributes } from 'react'

import { TableHeaderRow } from './TableHeaderRow';

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> { }

export const TableHead = ({
  children,
  ...props
}: TableHeadProps) => {
  return (
    <thead {...props}>
      {children === undefined ? <TableHeaderRow /> : children}
    </thead>
  );
};
