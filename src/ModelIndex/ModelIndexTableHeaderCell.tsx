import { TableHeaderCell, TableHeaderCellProps } from '@/Table';
import { humanizeText } from '@/utils';

export interface ModelIndexTableHeaderCellProps
  extends Omit<TableHeaderCellProps, 'columnId'> {
  field: string;
}

export const ModelIndexTableHeaderCell = ({
  field,
  children,
  ...props
}: ModelIndexTableHeaderCellProps) => {
  return (
    <TableHeaderCell columnId={field} {...props}>
      {children === undefined ? humanizeText(field) : children}
    </TableHeaderCell>
  );
};
