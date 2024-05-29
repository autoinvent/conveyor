import { useFormContext } from 'react-hook-form';
import {
  FaRegTrashAlt,
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
} from 'react-icons/fa';

import { useDataStore } from '@/Data';
import { Lens, useLenses, DataLens } from '@/Lenses';
import { TableCell, type TableCellProps } from '@/Table';
import type { DataType } from '@/types';

import { useModelIndexStore } from '../useModelIndexStore';

import { ACTION_COLUMN } from './constants';

export interface ModelIndexTableActionCellProps
  extends Omit<TableCellProps, 'columnId'> {}

export const ModelIndexTableActionCell = ({
  children,
  className,
  ...props
}: ModelIndexTableActionCellProps) => {
  const id = useDataStore((state) => state.id);
  const {
    formState: { dirtyFields },
    handleSubmit,
    reset,
  } = useFormContext();
  const { setLens } = useLenses();
  const showActions = useModelIndexStore((state) => state.showActions);
  const onUpdate = useModelIndexStore((state) => state.onUpdate);
  const onDelete = useModelIndexStore((state) => state.onDelete);

  const onEdit = () => setLens(DataLens.EDITING);
  const onCancelEdit = () => {
    setLens(DataLens.DISPLAY);
    reset();
  };
  const onSave = (formData: DataType) => {
    onUpdate?.({ data: formData, dirtyFields });
  };

  return showActions ? (
    <TableCell className="p-0" columnId={ACTION_COLUMN} {...props}>
      {children === undefined ? (
        <form className="whitespace-nowrap" onSubmit={handleSubmit(onSave)}>
          <Lens lens={DataLens.DISPLAY}>
            <button
              type="button"
              className="h-8 w-8 rounded-l-sm border-[--primary] pr-6 text-[--primary] hover:bg-[--primary] hover:text-[--text-color]"
              onClick={onEdit}
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete?.({ id })}
              type="button"
              className="h-8 w-8 rounded-r-sm border-[--danger] pr-6 text-[--danger] hover:bg-[--danger] hover:text-[--text-color]"
            >
              <FaRegTrashAlt />
            </button>
          </Lens>
          <Lens lens={DataLens.EDITING}>
            <button
              className="h-8 w-8 rounded-l-sm border-[--success] pr-6 text-[--success] hover:bg-[--success] hover:text-[--text-color]"
              type="submit"
            >
              <FaRegSave />
            </button>
            <button
              type="button"
              className="h-8 w-8 rounded-r-sm border-[--primary] pr-6 text-[--primary] hover:bg-[--primary] hover:text-[--text-color]"
              onClick={onCancelEdit}
            >
              <FaRegTimesCircle />
            </button>
          </Lens>
        </form>
      ) : (
        children
      )}
    </TableCell>
  ) : null;
};
