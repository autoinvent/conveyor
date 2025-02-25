import type { ComponentProps } from 'react';

import { useTableStore } from '../hooks/use-table-store';

export interface TableHeaderProps extends ComponentProps<'thead'> {}

export const TableHeader = ({ children, ...htmlProps }: TableHeaderProps) => {
  const TableHeaderRow = useTableStore(
    (state) => state.internals.TableHeaderRow,
  );
  return (
    <thead {...htmlProps}>
      {children === undefined ? <TableHeaderRow /> : children}
    </thead>
  );
};
