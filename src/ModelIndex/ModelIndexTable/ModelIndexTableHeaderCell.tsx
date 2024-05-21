import { TableHeaderCell, TableHeaderCellProps } from '@/Table';

import { ModelIndexTableHeaderCellDefaultContent } from './ModelIndexTableHeaderCellDefaultContent';

export interface ModelIndexTableHeaderCellProps
  extends Omit<TableHeaderCellProps, 'columnId'> {
  fieldName: string;
}

export const ModelIndexTableHeaderCell = Object.assign(
  ({ fieldName, children, ...props }: ModelIndexTableHeaderCellProps) => {
    return (
      <TableHeaderCell className="min-w-fit" columnId={fieldName} {...props}>
        {children === undefined ? (
          <ModelIndexTableHeaderCellDefaultContent fieldName={fieldName} />
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
