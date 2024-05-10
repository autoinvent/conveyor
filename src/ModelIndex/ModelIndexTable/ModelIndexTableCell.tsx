import { useData } from '@/Data';
import { ModelFormInput } from '@/ModelForm';
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
  const fieldData = useData((state) => state?.[fieldName]);
  const { selected } = useModelIndex((state) => ({
    fields: state.fields,
    onOpenFieldSelect: state.onOpenFieldSelect,
  }));
  const displayData = typeof fieldData === 'object' ? fieldData?.id : fieldData;
  return (
    <TableCell
      columnId={fieldName}
      {...props}
      onDoubleClick={() => setLens(DataLens.EDITING)}
    >
      {children === undefined ? (
        <>
          <Lens lens={DataLens.DISPLAY}>{displayData}</Lens>
          <Lens lens={DataLens.EDITING}>
            <ModelFormInput
              field={selected.fields.find(
                (field: Field) => field.name === fieldName,
              )}
              onOpenFieldSelect={selected.onOpenFieldSelect}
              className="w-full bg-[--bg-accent] h-full"
            />
          </Lens>
        </>
      ) : (
        children
      )}
    </TableCell>
  );
};
