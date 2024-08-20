import { useConveyorStore } from '@/Conveyor';
import { FormDisplay, useFormStore } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { TableCell, type TableCellProps } from '@/Table';
import { DataLens, ScalarType } from '@/types';
import { DndSortableWrapper } from '@/utils';

import { FormControl } from '@/Form/FormControl';
import { useModelTableStore } from './useModelTableStore';

export interface ModelTableCellProps extends Omit<TableCellProps, 'columnId'> {
  field: string;
}

export const ModelTableCell = ({
  field,
  children,
  ...tableCellProps
}: ModelTableCellProps) => {
  const { setLens, activeLens } = useLensesStore();
  const readOnly = useModelTableStore((state) => state.tableOptions?.readOnly);
  const draggable = useModelTableStore(
    (state) => state.tableOptions?.draggable ?? true,
  );
  const type = useModelTableStore(
    (state) => state.columnOptions?.[field]?.type ?? ScalarType.STRING,
  );
  const editable = useModelTableStore(
    (state) => state.columnOptions?.[field]?.editable ?? true,
  );
  const rules = useModelTableStore(
    (state) => state.columnOptions?.[field]?.rules,
  );
  const valueOptions = useModelTableStore(
    (state) => state.columnOptions?.[field]?.valueOptions ?? [],
  );
  const DisplayComponent = useConveyorStore(
    (state) => state.typeOptions?.[type]?.DisplayComponent ?? (() => null),
  );
  const InputComponent = useConveyorStore(
    (state) => state.typeOptions?.[type]?.InputComponent ?? (() => null),
  );
  const reset = useFormStore((state) => state.reset);
  const isSubmitting = useFormStore((state) => state.formState.isSubmitting);

  return (
    <DndSortableWrapper draggable={draggable} dndId={field} disabled>
      <TableCell
        columnId={field}
        onDoubleClick={() => {
          if (
            !readOnly &&
            editable &&
            activeLens === DataLens.DISPLAY &&
            !isSubmitting
          ) {
            setLens(DataLens.INPUT);
          }
        }}
        onKeyUp={(e) => {
          if (
            e.key === 'Escape' &&
            activeLens === DataLens.INPUT &&
            !isSubmitting
          ) {
            setLens(DataLens.DISPLAY);
            reset();
          }
        }}
        {...tableCellProps}
      >
        {children === undefined ? (
          editable ? (
            <>
              <Lens lens={DataLens.DISPLAY}>
                <FormDisplay name={field}>
                  <DisplayComponent />
                </FormDisplay>
              </Lens>
              <Lens lens={DataLens.INPUT}>
                <FormControl name={field} options={valueOptions} rules={rules}>
                  <InputComponent />
                </FormControl>
              </Lens>
            </>
          ) : (
            <FormDisplay name={field}>
              <DisplayComponent />
            </FormDisplay>
          )
        ) : (
          children
        )}
      </TableCell>
    </DndSortableWrapper>
  );
};
