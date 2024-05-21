import { ModelFormInput, ModelFormValue } from '@/ModelForm';
import { Lens, DataLens, useLenses } from '@/Lenses';
import { useModelIndex } from '@/ModelIndex';
import { TableCell, TableCellProps } from '@/Table';
import { Field } from '@/types';

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
  const { selected } = useModelIndex((state) => ({
    fields: state.fields,
    onOpenFieldSelect: state.onOpenFieldSelect,
  }));
  const field = selected.fields.find(
    (field: Field) => field.name === fieldName,
  );
  return (
    <TableCell
      columnId={fieldName}
      {...props}
      onDoubleClick={() => setLens(DataLens.EDITING)}
    >
      {children === undefined ? (
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
      )}
    </TableCell>
  );
};
