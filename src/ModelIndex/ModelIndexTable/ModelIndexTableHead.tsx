import { TableHead, TableHeadProps } from '@/Table';

import { ModelIndexTableHeaderRow } from './ModelIndexTableHeaderRow';

export interface ModelIndexTableHeadProps extends TableHeadProps {}

export const ModelIndexTableHead = ({
  children,
  ...props
}: ModelIndexTableHeadProps) => {
  return (
    <TableHead {...props}>
      {children === undefined ? <ModelIndexTableHeaderRow /> : children}
    </TableHead>
  );
};
