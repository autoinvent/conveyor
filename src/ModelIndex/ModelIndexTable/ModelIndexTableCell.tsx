import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { DEFAULT_TYPE, useConveyorStore } from '@/Conveyor';
import { FormInput, FormValue } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
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
  const { setLens, activeLens } = useLensesStore();
  const [currentLens, setCurrentLens] = useState(activeLens);
  const field = useModelIndexStore((state) =>
    state.fields.find((field) => field.name === fieldName),
  );

  if (field === undefined) {
    return null;
  }
  const inputFn = useConveyorStore(
    (state) =>
      state.inputOptions[field.type] ?? state.inputOptions[DEFAULT_TYPE],
  );
  const displayFn = useConveyorStore(
    (state) =>
      state.valueOptions[field.type] ?? state.valueOptions[DEFAULT_TYPE],
  );

  useEffect(() => {
    if (activeLens !== DataLens.LOADING) {
      setCurrentLens(activeLens);
    }
  }, [activeLens]);
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
          currentLens === DataLens.INPUT && field.editable && 'p-0',
          className,
        ),
      )}
    >
      {children === undefined ? (
        <>
          <Lens
            lens={
              !field.editable
                ? activeLens
                : activeLens === DataLens.LOADING &&
                    currentLens === DataLens.VALUE
                  ? DataLens.LOADING
                  : DataLens.VALUE
            }
          >
            <FormValue name={field.name} render={displayFn} />
          </Lens>
          <Lens
            lens={
              !field.editable
                ? false
                : activeLens === DataLens.LOADING &&
                    currentLens === DataLens.INPUT
                  ? DataLens.LOADING
                  : DataLens.INPUT
            }
          >
            <FormInput
              name={field.name}
              rules={{
                required: field.required ? `${field.name} is required.` : false,
              }}
              render={(props) =>
                inputFn({
                  ...props,
                  disabled: activeLens === DataLens.LOADING,
                })
              }
            />
          </Lens>
        </>
      ) : (
        children
      )}
    </TableCell>
  );
};
