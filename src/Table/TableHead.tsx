import type { ComponentProps } from 'react';

import { TableHeader as STableHead } from '@/lib/components/ui/table';

import { TableHeaderRow } from './TableHeaderRow';

export interface TableHeadProps extends ComponentProps<typeof STableHead> {}

export const TableHead = ({ children, ...htmlProps }: TableHeadProps) => {
  return (
    <STableHead {...htmlProps}>
      {children === undefined ? <TableHeaderRow /> : children}
    </STableHead>
  );
};
