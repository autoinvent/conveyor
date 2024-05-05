import {
  FaRegTrashAlt,
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
} from 'react-icons/fa';

import { Lens, useLenses, DataLens } from '@/Lenses';
import { TableCell, TableCellProps } from '@/Table';

import { ACTION_SLOT } from './constants';
import { useModelIndex } from './useModelIndex';
import { twMerge } from 'tailwind-merge';

export interface ModelIndexTableActionCellProps
extends Omit<TableCellProps, 'columnId'> {
}

export const ModelIndexTableActionCell = ({
  children,
  className,
  ...props
}: ModelIndexTableActionCellProps) => {
  const { setLens } = useLenses();
  const {selected} = useModelIndex((state) => ({showActions: state.showActions}) );
  // const { } = useStore(modelIndexStore, (state) => ({
  //   data: state.data,
  //   fields: state.fields,
  //   actionsConfig: state.actionsConfig,
  // }));

  const onEdit = () => setLens(DataLens.EDITING);
  const onCancelEdit = () => setLens(DataLens.DISPLAY);

  return selected.showActions ? (
    <TableCell className={twMerge('block mx-12', className)} columnId={ACTION_SLOT} {...props}>
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
