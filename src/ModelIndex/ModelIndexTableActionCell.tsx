import { HTMLAttributes } from 'react';
import {
  FaRegTrashAlt,
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
} from 'react-icons/fa';
import { useStore } from '@tanstack/react-store';

import { Lens, useLenses, DataLens } from '@/Lenses';

export interface ModelIndexTableActionCellProps
  extends HTMLAttributes<HTMLTableCellElement> {}

export const ModelIndexTableActionCell = ({
  children,
  ...props
}: ModelIndexTableActionCellProps) => {
  const { setLens } = useLenses();
  // const modelIndexStore = useModelIndexStore();
  // const { } = useStore(modelIndexStore, (state) => ({
  //   data: state.data,
  //   fields: state.fields,
  //   actionsConfig: state.actionsConfig,
  // }));

  const onEdit = () => setLens(DataLens.EDITING);
  const onCancelEdit = () => setLens(DataLens.DISPLAY);

  return (
    <td {...props}>
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
    </td>
  );
};
