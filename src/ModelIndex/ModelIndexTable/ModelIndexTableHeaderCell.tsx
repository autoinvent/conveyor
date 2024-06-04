import { TableHeaderCell, type TableHeaderCellProps } from '@/Table';
import { humanizeText } from '@/utils';

import { useModelIndexStore } from '../useModelIndexStore';

export interface ModelIndexTableHeaderCellProps
  extends Omit<TableHeaderCellProps, 'columnId'> {
  fieldName: string;
}

export const ModelIndexTableHeaderCell = ({
  fieldName,
  children,
  ...props
}: ModelIndexTableHeaderCellProps) => {
  const field = useModelIndexStore((state) =>
    state.fields.find((field) => field.name === fieldName),
  );
  if (field === undefined) {
    return null;
  }
  return (
    <TableHeaderCell columnId={fieldName} {...props}>
      {children === undefined
        ? // <ModelIndexTableHeaderCellDefaultContent fieldName={fieldName} />
          humanizeText(fieldName)
        : children}
    </TableHeaderCell>
  );
};
