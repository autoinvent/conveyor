import { TableBody, TableBodyProps } from '@/Table';

import { ModelIndexTableRow } from './ModelIndexTableRow';

export interface ModelIndexTableBodyProps extends TableBodyProps {}

export const ModelIndexTableBody = ({
  children,
  ...props
}: ModelIndexTableBodyProps) => {
  return (
    <TableBody {...props}>
      {children === undefined ? <ModelIndexTableRow /> : children}
    </TableBody>
  );
};
