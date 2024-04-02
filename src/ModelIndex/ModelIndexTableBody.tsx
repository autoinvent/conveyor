import { TableBody, TableBodyProps } from '@/Table';

import { ModelIndexTableRow } from './ModelIndexTableRow';

export interface ModelIndexTableBodyProps extends TableBodyProps {}

export const ModelIndexTableBody = ({
  children,
  id,
  className,
  style,
}: ModelIndexTableBodyProps) => {
  return (
    <TableBody id={id} className={className} style={style}>
      {children === undefined ? <ModelIndexTableRow /> : children}
    </TableBody>
  );
};
