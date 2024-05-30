import { TableHeaderCell, type TableHeaderCellProps } from '@/Table';

import { humanizeText } from '@/utils';

export interface ModelIndexTableHeaderCellProps
  extends Omit<TableHeaderCellProps, 'columnId'> {
  fieldName: string;
}

export const ModelIndexTableHeaderCell = ({
  fieldName,
  children,
  ...props
}: ModelIndexTableHeaderCellProps) => {
  // TODO: Sort
  return (
    <TableHeaderCell columnId={fieldName} {...props}>
      {children === undefined
        ? // <ModelIndexTableHeaderCellDefaultContent fieldName={fieldName} />
          humanizeText(fieldName)
        : children}
    </TableHeaderCell>
  );
};
