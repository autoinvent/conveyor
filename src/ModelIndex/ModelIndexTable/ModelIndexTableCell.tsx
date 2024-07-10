import { useId } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useConveyorStore } from '@/Conveyor';
import { FormInput, FormValue } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { useLoadingStore } from '@/Loading';
import { TableCell, type TableCellProps } from '@/Table';
import { DataLens, type DataType, type Field, FieldTypes } from '@/types';

import { useModelIndexStore } from '../useModelIndexStore';
import type { ModelIndexState } from '../ModelIndexStoreContext';

export interface ModelIndexTableCellProps
  extends Omit<TableCellProps, 'columnId'> {
  fieldName: string;
}

export const ModelIndexTableCell = ({
  fieldName,
  children,
  ...props
}: ModelIndexTableCellProps) => {
  const refId = useId();
  const formFieldId = `${fieldName}-${refId}`;
  const formErrorMessageId = `${formFieldId}-error-message-${refId}`;
  const isLoading = useLoadingStore((state) => state.isLoading);
  const { setLens, activeLens } = useLensesStore();
  const readOnly = useModelIndexStore((state) => state.readOnly);
  const field = useModelIndexStore(
    useShallow<ModelIndexState<DataType>, Field>(
      (state) =>
        state.fields.find((field) => field.name === fieldName) ?? {
          name: fieldName,
          type: FieldTypes.DEFAULT,
        },
    ),
  );
  const inputFn = useConveyorStore(
    useShallow(
      (state) =>
        state.typeOptions?.[field.type]?.inputRenderFn ??
        state.typeOptions?.[FieldTypes.DEFAULT]?.inputRenderFn ??
        (() => null),
    ),
  );
  const valueFn = useConveyorStore(
    useShallow(
      (state) =>
        state.typeOptions?.[field.type]?.valueRenderFn ??
        state.typeOptions?.[FieldTypes.DEFAULT]?.valueRenderFn ??
        (() => null),
    ),
  );

  if (field === undefined) {
    return null;
  }

  return (
    <TableCell
      columnId={fieldName}
      onDoubleClick={() =>
        readOnly && activeLens === DataLens.VALUE && setLens(DataLens.INPUT)
      }
      onKeyUp={(e) =>
        e.key === 'Escape' &&
        activeLens === DataLens.INPUT &&
        setLens(DataLens.VALUE)
      }
      {...props}
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
                render={({ inputProps, inputState, formState }) => {
                  const extraInputProps = Object.assign(inputProps, {
                    id: formFieldId,
                    disabled: isLoading,
                    required: !!field.rules?.required,
                    'aria-describedby': !inputState.invalid
                      ? `${formFieldId}`
                      : `${formFieldId} ${formErrorMessageId}`,
                    'aria-invalid': inputState.invalid,
                  });
                  return inputFn({
                    inputProps: extraInputProps,
                    inputState,
                    formState,
                  });
                }}
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
