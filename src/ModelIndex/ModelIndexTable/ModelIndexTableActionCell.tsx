import {
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
  FaRegTrashAlt,
} from 'react-icons/fa';

import { useFormStore } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { TableCell, type TableCellProps } from '@/Table';
import { DataLens, type DataType } from '@/types';

import { useModelIndexStore } from '../useModelIndexStore';

import { ACTION_COLUMN } from './constants';

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
  const setLens = useLensesStore((state) => state.setLens);
  const showActions = useModelIndexStore((state) => state.showActions);
  const onUpdate = useModelIndexStore((state) => state.onUpdate);
  const onDelete = useModelIndexStore((state) => state.onDelete);

  const onEdit = () => setLens(DataLens.INPUT);
  const onCancelEdit = () => {
    setLens(DataLens.VALUE);
    reset();
  };
  const onSave = (formData: DataType) => {
    onUpdate?.({ data: formData, dirtyFields });
  };

  return showActions ? (
    <TableCell className="p-0" columnId={ACTION_COLUMN} {...props}>
      {children === undefined ? (
        <form className="whitespace-nowrap" onSubmit={handleSubmit(onSave)}>
          <Lens lens={DataLens.VALUE}>
            <button
              type="button"
              className="h-8 w-8 rounded-l-sm border-[--primary] pr-6 text-[--primary] focus:bg-[--primary] hover:bg-[--primary] focus:text-[--text-color] hover:text-[--text-color]"
              onClick={onEdit}
              onKeyUp={(e) => e.key === 'Enter' && onEdit()}
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete?.(defaultValues)}
              onKeyUp={(e) => e.key === 'Enter' && onDelete?.(defaultValues)}
              type="button"
              className="h-8 w-8 rounded-r-sm border-[--danger] pr-6 text-[--danger] focus:bg-[--danger] hover:bg-[--danger] focus:text-[--text-color] hover:text-[--text-color]"
            >
              <FaRegTrashAlt />
            </button>
          </Lens>
          <Lens lens={DataLens.INPUT}>
            <button
              className="h-8 w-8 rounded-l-sm border-[--success] pr-6 text-[--success] focus:bg-[--success] hover:bg-[--success] focus:text-[--text-color] hover:text-[--text-color]"
              type="submit"
            >
              <FaRegSave />
            </button>
            <button
              type="button"
              className="h-8 w-8 rounded-r-sm border-[--primary] pr-6 text-[--primary] focus:bg-[--primary] hover:bg-[--primary] focus:text-[--text-color] hover:text-[--text-color]"
              onClick={onCancelEdit}
              onKeyUp={(e) => e.key === 'Enter' && onCancelEdit()}
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
