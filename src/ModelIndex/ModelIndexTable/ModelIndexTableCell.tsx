import { useId } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useConveyorStore } from '@/Conveyor';
import { FormInput, FormValue } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { useLoadingStore } from '@/Loading';
import { TableCell, type TableCellProps } from '@/Table';
import { DataLens, FieldTypes } from '@/types';

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
  const refId = useId();
  const formFieldId = `${fieldName}-${refId}`;
  const formErrorMessageId = `${formFieldId}-error-message-${refId}`;
  const isLoading = useLoadingStore((state) => state.isLoading);
  const { setLens, activeLens } = useLensesStore();
  const showActions = useModelIndexStore((state) => state.showActions);
  const field = useModelIndexStore((state) =>
    state.fields.find((field) => field.name === fieldName),
  );
  const inputFn = useConveyorStore(
    useShallow(
      (state) =>
        state.typeOptions?.[field?.type ?? FieldTypes.DEFAULT]?.inputRenderFn ??
        state.typeOptions?.[FieldTypes.DEFAULT]?.inputRenderFn ??
        (() => null),
    ),
  );
  const valueFn = useConveyorStore(
    useShallow(
      (state) =>
        state.typeOptions?.[field?.type ?? FieldTypes.DEFAULT]?.valueRenderFn ??
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
      {...props}
      onDoubleClick={() =>
        showActions && activeLens === DataLens.VALUE && setLens(DataLens.INPUT)
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
                    id: formFieldId,
                    disabled: isLoading,
                    required: !!field.rules?.required,
                    'aria-describedby': !props.inputState.invalid
                      ? `${formFieldId}`
                      : `${formFieldId} ${formErrorMessageId}`,
                    'aria-invalid': props.inputState.invalid,
                    ...props,
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
