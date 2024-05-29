import { ModelFormInput, ModelFormValue } from '@/ModelForm';
import { Lens, DataLens, useLenses } from '@/Lenses';
import { TableCell, type TableCellProps } from '@/Table';

import { useModelIndexStore } from '../useModelIndexStore';

export interface ModelIndexTableCellProps
  extends Omit<TableCellProps, 'columnId'> {
  fieldName: string;
}

export const ModelIndexTableCell = ({
  fieldName,
  children,
  ...props
}: ModelIndexTableCellProps) => {
  const { setLens } = useLenses();
  const fields = useModelIndexStore((state) => state.fields);
  const field = fields.find((field) => field.name === fieldName);
  return (
    <TableCell
      columnId={fieldName}
      {...props}
      onDoubleClick={() => setLens(DataLens.EDITING)}
    >
      {/* {children === undefined ? (
        <>
          <Lens lens={DataLens.DISPLAY}>
            <ModelFormValue field={field} />
          </Lens>
          <Lens lens={DataLens.EDITING}>
            {field?.editable ? (
              <ModelFormInput
                field={field}
                onOpenFieldSelect={selected.onOpenFieldSelect}
              />
            ) : (
              <ModelFormValue field={field} />
            )}
          </Lens>
        </>
      ) : (
        children
      )} */}
    </TableCell>
  );
};
