import { TableBody, type TableBodyProps } from '@/Table';

import { ModelIndexTableRow } from './ModelIndexTableRow';

export interface ModelIndexTableBodyProps extends TableBodyProps {}

export const ModelIndexTableBody = ({
  getRowId = (data) => data.id,
  children,
  ...props
}: ModelIndexTableBodyProps) => {
  return (
    <TableBody getRowId={getRowId} {...props}>
      {children === undefined ? <ModelIndexTableRow /> : children}
    </TableBody>
  );
};
