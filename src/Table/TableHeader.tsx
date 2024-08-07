import type { ComponentProps } from 'react';

import { TableHeader as STableHeader } from '@/lib/components/ui/table';

import { TableHeaderRow } from './TableHeaderRow';

export interface TableHeaderProps extends ComponentProps<typeof STableHeader> {}

export const TableHeader = ({ children, ...htmlProps }: TableHeaderProps) => {
  return (
    <STableHeader {...htmlProps}>
      {children === undefined ? <TableHeaderRow /> : children}
    </STableHeader>
  );
};
