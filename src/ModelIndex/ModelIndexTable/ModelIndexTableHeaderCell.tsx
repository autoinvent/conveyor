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
  // TODO: classname default..
  return (
    <TableHeaderCell className="min-w-fit" columnId={fieldName} {...props}>
      {children === undefined
        ? // <ModelIndexTableHeaderCellDefaultContent fieldName={fieldName} />
          humanizeText(fieldName)
        : children}
    </TableHeaderCell>
  );
};
