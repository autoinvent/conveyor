import type { ComponentProps } from 'react';

import { useTableStore } from '../hooks/use-table-store';

export interface TableHeaderProps extends ComponentProps<'thead'> {}

export const TableHeader = ({ children, ...htmlProps }: TableHeaderProps) => {
  const HeaderRow = useTableStore((state) => state.components.HeaderRow);
  return (
    <thead {...htmlProps}>
      {children === undefined ? <HeaderRow /> : children}
    </thead>
  );
};
