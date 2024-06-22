import {
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
  FaRegTrashAlt,
} from 'react-icons/fa';

import { useFormStore } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { Spinner, useLoadingStore } from '@/Loading';
import { TableCell, type TableCellProps } from '@/Table';
import { DataLens, type DataType } from '@/types';

import { useModelIndexStore } from '../useModelIndexStore';

import { twMerge } from 'tailwind-merge';
import { ACTION_COLUMN } from './constants';
import { useDataStore } from '@/Data';

export interface ModelIndexTableActionCellProps
  extends Omit<TableCellProps, 'columnId'> {}

export const ModelIndexTableActionCell = ({
  children,
  className,
  ...props
}: ModelIndexTableActionCellProps) => {
  const { isLoading, setIsLoading } = useLoadingStore();
  const dirtyFields = useFormStore((state) => state.formState.dirtyFields);
  const data = useDataStore()
  const reset = useFormStore((state) => state.reset);
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const setLens = useLensesStore((state) => state.setLens);
  const showActions = useModelIndexStore((state) => state.showActions);
  const onUpdate = useModelIndexStore((state) => state.onUpdate);
  const onDelete = useModelIndexStore((state) => state.onDelete);

  const onEdit = () => setLens(DataLens.INPUT);
  const onCancelEdit = () => {
    setLens(DataLens.VALUE);
    reset();
  };
  const onSave = async (formData: DataType) => {
    onUpdate && setIsLoading(true);
    await onUpdate?.({ data: formData, dirtyFields });
    setIsLoading(false);
  };
  const onDeleteHandler = async () => {
    onDelete && setIsLoading(true);
    await onDelete?.(data);
    setIsLoading(false);
  };

  return (
    showActions && (
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
            <Lens lens={!isLoading && DataLens.VALUE}>
              <button
                type="button"
                className="flex h-full grow items-center justify-center rounded-l-sm border border-primary px-2 py-1 text-primary focus:bg-primary hover:bg-primary focus:text-text hover:text-text"
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
                  className="flex h-full grow items-center justify-center rounded-r-sm border border-danger px-2 py-1 text-danger focus:bg-danger hover:bg-danger focus:text-text hover:text-text"
                >
                  <FaRegTrashAlt />
                </button>
              )}
            </Lens>
            <Lens lens={!isLoading && DataLens.INPUT}>
              {onUpdate && (
                <button
                  className="flex h-full grow items-center justify-center rounded-l-sm border border-success px-2 py-1 text-success focus:bg-success hover:bg-success focus:text-text hover:text-text"
                  type="submit"
                >
                  <FaRegSave />
                </button>
              )}
              <button
                type="button"
                className="flex h-full grow items-center justify-center rounded-r-sm border border-primary px-2 py-1 text-primary focus:bg-primary hover:bg-primary focus:text-text hover:text-text"
                onClick={onCancelEdit}
                onKeyUp={(e) => e.key === 'Enter' && onCancelEdit()}
              >
                <FaRegTimesCircle />
              </button>
            </Lens>
            {isLoading && <Spinner />}
          </form>
        ) : (
          children
        )}
      </TableCell>
    )
  );
};
