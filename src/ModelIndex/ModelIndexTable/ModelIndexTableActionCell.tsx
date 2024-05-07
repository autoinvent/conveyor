import {
  FaRegTrashAlt,
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
} from 'react-icons/fa';

import { useData } from '@/Data';
import { Lens, useLenses, DataLens } from '@/Lenses';
import { useModelIndex } from '@/ModelIndex';
import { TableCell, TableCellProps } from '@/Table';

import { ACTION_SLOT } from './constants';

export interface ModelIndexTableActionCellProps
  extends Omit<TableCellProps, 'columnId'> { }

export const ModelIndexTableActionCell = ({
  children,
  className,
  ...props
}: ModelIndexTableActionCellProps) => {
  const { data, reset } = useData((state) => state);
  const { setLens } = useLenses();
  const { selected } = useModelIndex((state) => ({
    showActions: state.showActions,
  }));
  // const { } = useStore(modelIndexStore, (state) => ({
  //   data: state.data,
  //   fields: state.fields,
  //   actionsConfig: state.actionsConfig,
  // }));

  const onEdit = () => setLens(DataLens.EDITING);
  const onCancelEdit = () => {
    setLens(DataLens.DISPLAY);
    reset();
  };

  return selected.showActions ? (
    <TableCell columnId={ACTION_SLOT} {...props}>
      {children === undefined ? (
        <div>
          <Lens lens={DataLens.DISPLAY}>
            <button onClick={onEdit}>
              <FaEdit />
            </button>
            <button>
              <FaRegTrashAlt />
            </button>
          </Lens>
          <Lens lens={DataLens.EDITING}>
            <button>
              <FaRegSave />
            </button>
            <button onClick={onCancelEdit}>
              <FaRegTimesCircle />
            </button>
          </Lens>
        </div>
      ) : (
        children
      )}
    </TableCell>
  ) : null;
};
