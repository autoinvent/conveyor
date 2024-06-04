import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useConveyorStore } from '@/Conveyor';
import { FormInput, FormValue } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { TableCell, type TableCellProps } from '@/Table';
import { DataLens, DefaultTypes } from '@/types';

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
  const { setLens, activeLens } = useLensesStore();
  const field = useModelIndexStore((state) =>
    state.fields.find((field) => field.name === fieldName),
  );

  if (field === undefined) {
    throw new Error(
      `${fieldName} does not exist in the list of fields passed in ModelIndex.`,
    );
  }
  const inputFn = useConveyorStore(
    (state) =>
      state.inputOptions[field.type] ?? state.inputOptions[DefaultTypes.MODEL],
  );
  const displayFn = useConveyorStore(
    (state) =>
      state.valueOptions[field.type] ?? state.valueOptions[DefaultTypes.MODEL],
  );
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
      className={twMerge(
        clsx(
          activeLens === DataLens.INPUT && field.editable && 'p-0',
          className,
        ),
      )}
    >
      {children === undefined ? (
        <>
          <Lens
            lens={
              !field.editable && activeLens === DataLens.INPUT
                ? DataLens.INPUT
                : DataLens.VALUE
            }
          >
            <FormValue name={field.name} render={displayFn} />
          </Lens>
          {field.editable && (
            <Lens lens={DataLens.INPUT}>
              <FormInput
                name={field.name}
                rules={{
                  required: field.required
                    ? `${field.name} is required.`
                    : false,
                }}
                render={inputFn}
              />
            </Lens>
          )}
        </>
      ) : (
        children
      )}
    </TableCell>
  );
};
