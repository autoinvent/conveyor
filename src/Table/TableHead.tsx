import type { ComponentProps } from 'react';

import { STableHeader } from '@/lib/components/ui/table';

import { TableHeaderRow } from './TableHeaderRow';

export interface TableHeadProps extends ComponentProps<typeof STableHeader> {}

export const TableHead = ({ children, ...htmlProps }: TableHeadProps) => {
  return (
    <STableHeader {...htmlProps}>
      {children === undefined ? <TableHeaderRow /> : children}
    </STableHeader>
  );
};
