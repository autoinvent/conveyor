import { TableBody, type TableBodyProps } from '@/Table';

import { ModelTableRow } from './ModelTableRow';

export interface ModelTableBodyProps extends TableBodyProps {}

export const ModelTableBody = ({
  getRowId = (data) => data.id,
  children,
  ...props
}: ModelTableBodyProps) => {
  return (
    <TableBody getRowId={getRowId} {...props}>
      {children === undefined ? <ModelTableRow /> : children}
    </TableBody>
  );
};
