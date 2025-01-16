import { useConveyorStore } from '@/Conveyor';
import { FormDisplay, useFormStore } from '@/Form';
import { FormControl } from '@/Form/FormControl';
import { Lens, useLensesStore } from '@/Lenses';
import { TableCell, type TableCellProps } from '@/Table';
import { DataLens, ScalarType } from '@/types';
import { DndSortableWrapper, humanizeText } from '@/utils';

import { useModelTableStore } from './useModelTableStore';
import { useActionStore } from '@/Actions/useActionStore';

export interface ModelTableCellProps extends Omit<TableCellProps, 'columnId'> {
  field: string;
}

export const ModelTableCell = ({
  field,
  children,
  ...tableCellProps
}: ModelTableCellProps) => {
  const { setLens, activeLens } = useLensesStore();
  const showActions = useActionStore((state) => state.showActions);
  const onUpdate = useActionStore((state) => state.actions?.UPDATE);
  const draggable = useModelTableStore(
    (state) => state.tableOptions?.draggable ?? true,
  );
  const label = useModelTableStore(
    (state) => state.columnOptions?.[field]?.label ?? humanizeText(field),
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
  const required = useModelTableStore(
    (state) => state.columnOptions?.[field]?.required,
  );
  const inputProps = useModelTableStore(
    (state) => state.columnOptions?.[field]?.inputProps,
  );
  const displayProps = useModelTableStore(
    (state) => state.columnOptions?.[field]?.displayProps,
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
            showActions !== false &&
            editable &&
            activeLens === DataLens.DISPLAY &&
            !isSubmitting &&
            onUpdate
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
                  <DisplayComponent {...displayProps} />
                </FormDisplay>
              </Lens>
              <Lens lens={DataLens.INPUT}>
                <FormControl
                  name={field}
                  rules={{
                    required: required && `${label} is required.`,
                    ...rules,
                  }}
                >
                  <InputComponent {...inputProps} />
                </FormControl>
              </Lens>
            </>
          ) : (
            <FormDisplay name={field}>
              <DisplayComponent {...displayProps} />
            </FormDisplay>
          )
        ) : (
          children
        )}
      </TableCell>
    </DndSortableWrapper>
  );
};
