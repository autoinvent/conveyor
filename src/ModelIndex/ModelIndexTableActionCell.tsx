import { ButtonGroup, Button } from 'react-bootstrap';
import {
  FaRegTrashAlt,
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
} from 'react-icons/fa';
import { useStore } from '@tanstack/react-store';

import { Lens, useLenses, DataLens } from '@/Lenses';
import { CommonProps, WrapperProp } from '@/types';

import { useModelIndexStore } from './useModelIndexStore';

export interface ModelIndexTableActionCellProps
  extends CommonProps,
    WrapperProp {}

export const ModelIndexTableActionCell = ({
  children,
  id,
  className,
  style,
}: ModelIndexTableActionCellProps) => {
  const { setLens } = useLenses();
  const modelIndexStore = useModelIndexStore();
  const { actionsConfig } = useStore(modelIndexStore, (state) => ({
    data: state.data,
    fields: state.fields,
    actionsConfig: state.actionsConfig,
  }));
  const showActions = actionsConfig?.showActions !== false;

  const onEdit = () => setLens(DataLens.EDITING);
  const onCancelEdit = () => setLens(DataLens.DISPLAY);

  return showActions ? (
    <td id={id} className={className} style={style}>
      {children === undefined ? (
        <ButtonGroup>
          <Lens lens={DataLens.DISPLAY}>
            <Button variant='outline-primary' onClick={onEdit}>
              <FaEdit />
            </Button>
            <Button variant='outline-danger'>
              <FaRegTrashAlt />
            </Button>
          </Lens>
          <Lens lens={DataLens.EDITING}>
            <Button variant='outline-success'>
              <FaRegSave />
            </Button>
            <Button variant='outline-primary' onClick={onCancelEdit}>
              <FaRegTimesCircle />
            </Button>
          </Lens>
        </ButtonGroup>
      ) : (
        children
      )}
    </td>
  ) : null;
};
