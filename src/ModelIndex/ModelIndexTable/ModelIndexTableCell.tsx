import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useConveyorStore } from '@/Conveyor';
import { Lens, DataLens, useLenses } from '@/Lenses';
import { ModelFormInput, ModelFormValue } from '@/ModelForm';
import { TableCell, type TableCellProps } from '@/Table';

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
  const { setLens, activeLens } = useLenses();
  const field = useModelIndexStore((state) =>
    state.fields.find((field) => field.name === fieldName),
  );

  if (field === undefined) {
    throw new Error(
      `${fieldName} does not exist in the list of fields passed in ModelIndex.`,
    );
  }
  const inputFn = useConveyorStore(
    (state) => state.inputOptions[field.type] ?? state.inputOptions.__default__,
  );
  const displayFn = useConveyorStore(
    (state) => state.valueOptions[field.type] ?? state.valueOptions.__default__,
  );
  return (
    <TableCell
      columnId={fieldName}
      {...props}
      onDoubleClick={() =>
        activeLens === DataLens.DISPLAY && setLens(DataLens.EDITING)
      }
      onKeyUp={(e) =>
        e.key === 'Escape' &&
        activeLens === DataLens.EDITING &&
        setLens(DataLens.DISPLAY)
      }
      className={twMerge(
        clsx(
          activeLens === DataLens.EDITING && field.editable && 'p-0',
          className,
        ),
      )}
    >
      {children === undefined ? (
        <>
          <Lens lens={DataLens.DISPLAY}>
            <ModelFormValue field={field} render={displayFn} />
          </Lens>
          <Lens lens={DataLens.EDITING}>
            {field?.editable ? (
              <ModelFormInput field={field} render={inputFn} />
            ) : (
              <ModelFormValue field={field} render={displayFn} />
            )}
          </Lens>
        </>
      ) : (
        children
      )}
    </TableCell>
  );
};
