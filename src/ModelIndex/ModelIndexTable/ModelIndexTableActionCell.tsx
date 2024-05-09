import { useFormContext } from 'react-hook-form';
import {
  FaRegTrashAlt,
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
} from 'react-icons/fa';

import { DataType, useData } from '@/Data';
import { Lens, useLenses, DataLens } from '@/Lenses';
import { useModelIndex } from '@/ModelIndex';
import { TableCell, TableCellProps } from '@/Table';

import { ACTION_SLOT } from './constants';

export interface ModelIndexTableActionCellProps
  extends Omit<TableCellProps, 'columnId'> {}

export const ModelIndexTableActionCell = ({
  children,
  className,
  ...props
}: ModelIndexTableActionCellProps) => {
  const id = useData((state) => state.id);
  const {
    formState: { dirtyFields },
    handleSubmit,
    reset,
  } = useFormContext();
  const { setLens } = useLenses();
  const { selected } = useModelIndex((state) => ({
    showActions: state.showActions,
    onSave: state.onSave,
  }));

  const onEdit = () => setLens(DataLens.EDITING);
  const onCancelEdit = () => {
    setLens(DataLens.DISPLAY);
    reset();
  };
  const onSave = (formData: DataType) => {
    selected.onSave?.({ data: formData, dirtyFields });
  };

  return selected.showActions ? (
    <TableCell columnId={ACTION_SLOT} {...props}>
      {children === undefined ? (
        <form id={id} onSubmit={handleSubmit(onSave)}>
          <Lens lens={DataLens.DISPLAY}>
            <button onClick={onEdit}>
              <FaEdit />
            </button>
            <button>
              <FaRegTrashAlt />
            </button>
          </Lens>
          <Lens lens={DataLens.EDITING}>
            <button type="submit">
              <FaRegSave />
            </button>
            <button onClick={onCancelEdit}>
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
