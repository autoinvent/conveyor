import { useShallow } from 'zustand/react/shallow';

import { DEFAULT_TYPE, useConveyorStore } from '@/Conveyor';
import { FormInput, FormValue } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { useLoadingStore } from '@/Loading';
import { TableCell, type TableCellProps } from '@/Table';
import { DataLens } from '@/types';

import { useModelIndexStore } from '../useModelIndexStore';

export interface ModelIndexTableCellProps
  extends Omit<TableCellProps, 'columnId'> {
  fieldName: string;
}

export const ModelIndexTableCell = ({
  fieldName,
  children,
  className,
  ...props
}: ModelIndexTableCellProps) => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const { setLens, activeLens } = useLensesStore();
  const field = useModelIndexStore((state) =>
    state.fields.find((field) => field.name === fieldName),
  );
  const inputFn = useConveyorStore(
    useShallow(
      (state) =>
        state.typeOptions?.[field?.type ?? DEFAULT_TYPE]?.inputRenderFn ??
        state.typeOptions?.[DEFAULT_TYPE]?.inputRenderFn ??
        (() => null),
    ),
  );
  const valueFn = useConveyorStore(
    useShallow(
      (state) =>
        state.typeOptions?.[field?.type ?? DEFAULT_TYPE]?.valueRenderFn ??
        state.typeOptions?.[DEFAULT_TYPE]?.valueRenderFn ??
        (() => null),
    ),
  );

  if (field === undefined) {
    return null;
  }

  return (
    <TableCell
      columnId={fieldName}
      {...props}
      onDoubleClick={() =>
        activeLens === DataLens.VALUE && setLens(DataLens.INPUT)
      }
      onKeyUp={(e) =>
        e.key === 'Escape' &&
        activeLens === DataLens.INPUT &&
        setLens(DataLens.VALUE)
      }
    >
      {children === undefined ? (
        field.editable ? (
          <>
            <Lens lens={DataLens.VALUE}>
              <FormValue name={field.name} render={valueFn} />
            </Lens>
            <Lens lens={DataLens.INPUT}>
              <FormInput
                name={field.name}
                rules={field.rules}
                render={(props) =>
                  inputFn({
                    ...props,
                    disabled: isLoading,
                  })
                }
              />
            </Lens>
          </>
        ) : (
          <FormValue name={field.name} render={valueFn} />
        )
      ) : (
        children
      )}
    </TableCell>
  );
};
