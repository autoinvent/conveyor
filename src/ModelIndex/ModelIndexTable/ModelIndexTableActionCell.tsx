import {
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
  FaRegTrashAlt,
} from 'react-icons/fa';

import { Spinner } from '@/AtomicComponents';
import { useFormStore } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { TableCell, type TableCellProps } from '@/Table';
import { DataLens, type DataType } from '@/types';

import { useModelIndexStore } from '../useModelIndexStore';

import { ACTION_COLUMN } from './constants';
import { twMerge } from 'tailwind-merge';

export interface ModelIndexTableActionCellProps
  extends Omit<TableCellProps, 'columnId'> {}

export const ModelIndexTableActionCell = ({
  children,
  className,
  ...props
}: ModelIndexTableActionCellProps) => {
  const { defaultValues, dirtyFields } = useFormStore(
    (state) => state.formState,
  );
  const reset = useFormStore((state) => state.reset);
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const { activeLens, setLens } = useLensesStore();
  const showActions = useModelIndexStore((state) => state.showActions);
  const onUpdate = useModelIndexStore((state) => state.onUpdate);
  const onDelete = useModelIndexStore((state) => state.onDelete);

  const onEdit = () => setLens(DataLens.INPUT);
  const onCancelEdit = () => {
    setLens(DataLens.VALUE);
    reset();
  };
  const onSave = (formData: DataType) => {
    onUpdate && setLens(DataLens.LOADING);
    onUpdate?.({ data: formData, dirtyFields })?.finally(() => {
      setLens(activeLens);
    });
  };
  const onDeleteHandler = () => {
    onDelete && setLens(DataLens.LOADING);
    onDelete?.(defaultValues)?.finally(() => {
      setLens(activeLens);
    });
  };

  return showActions ? (
    <TableCell
      className={twMerge('w-0 p-0', className)}
      columnId={ACTION_COLUMN}
      {...props}
    >
      {children === undefined ? (
        <form
          className="flex h-full items-center justify-center whitespace-nowrap"
          onSubmit={handleSubmit(onSave)}
        >
          <Lens lens={DataLens.VALUE}>
            <button
              type="button"
              className="flex h-full grow items-center justify-center rounded-l-sm border-[--primary] text-[--primary] focus:bg-[--primary] hover:bg-[--primary] focus:text-[--text-color] hover:text-[--text-color]"
              onClick={onEdit}
              onKeyUp={(e) => e.key === 'Enter' && onEdit()}
            >
              <FaEdit />
            </button>
            {onDelete && (
              <button
                onClick={onDeleteHandler}
                onKeyUp={(e) => e.key === 'Enter' && onDeleteHandler()}
                type="button"
                className="flex h-full grow items-center justify-center rounded-r-sm border-[--danger] text-[--danger] focus:bg-[--danger] hover:bg-[--danger] focus:text-[--text-color] hover:text-[--text-color]"
              >
                <FaRegTrashAlt />
              </button>
            )}
          </Lens>
          <Lens lens={DataLens.INPUT}>
            {onUpdate && (
              <button
                className="flex h-full grow items-center justify-center rounded-l-sm border-[--success] text-[--success] focus:bg-[--success] hover:bg-[--success] focus:text-[--text-color] hover:text-[--text-color]"
                type="submit"
              >
                <FaRegSave />
              </button>
            )}
            <button
              type="button"
              className="flex h-full grow items-center justify-center rounded-r-sm border-[--primary] text-[--primary] focus:bg-[--primary] hover:bg-[--primary] focus:text-[--text-color] hover:text-[--text-color]"
              onClick={onCancelEdit}
              onKeyUp={(e) => e.key === 'Enter' && onCancelEdit()}
            >
              <FaRegTimesCircle />
            </button>
          </Lens>
          <Lens lens={DataLens.LOADING}>
            <Spinner />
          </Lens>
        </form>
      ) : (
        children
      )}
    </TableCell>
  ) : null;
};
