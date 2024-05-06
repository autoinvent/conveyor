import { TableHeaderCell, TableHeaderCellProps } from '@/Table';

import { ModelIndexTableHeaderCellDefaultContent } from './ModelIndexTableHeaderCellDefaultContent';

export interface ModelIndexTableHeaderCellProps
  extends Omit<TableHeaderCellProps, 'columnId'> {
  field: string;
}

export const ModelIndexTableHeaderCell = Object.assign(
  ({ field, children, ...props }: ModelIndexTableHeaderCellProps) => {
    return (
      <TableHeaderCell columnId={field} {...props}>
        {children === undefined ? (
          <ModelIndexTableHeaderCellDefaultContent field={field} />
        ) : (
          children
        )}
      </TableHeaderCell>
    );
  },
  {
    DefaultContent: ModelIndexTableHeaderCellDefaultContent,
  },
);
