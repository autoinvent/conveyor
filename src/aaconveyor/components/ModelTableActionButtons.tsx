import { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import {
  FaRegTrashAlt,
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
} from 'react-icons/fa';

import {
  DisplayKeys,
  SetDisplayKeyContext,
} from '../contexts/DisplayKeyContext';
import { BaseComponentProps } from '../types';
import Display from './Display';

interface ModelTableActionButtonsProps extends BaseComponentProps {}

const ModelTableActionButtons = ({
  id,
  className,
}: ModelTableActionButtonsProps) => {
  const setDisplayKey = useContext(SetDisplayKeyContext);
  const onEdit = () => setDisplayKey(DisplayKeys.EDIT);
  const onCancelEdit = () => setDisplayKey(DisplayKeys.VALUE);

  return (
    <ButtonGroup id={id} className={className}>
      <Display activeKey={DisplayKeys.VALUE}>
        <Button variant='outline-primary' onClick={onEdit}>
          <FaEdit />
        </Button>
        <Button variant='outline-danger'>
          <FaRegTrashAlt />
        </Button>
      </Display>
      <Display activeKey={DisplayKeys.EDIT}>
        <Button variant='outline-success'>
          <FaRegSave />
        </Button>
        <Button variant='outline-primary' onClick={onCancelEdit}>
          <FaRegTimesCircle />
        </Button>
      </Display>
    </ButtonGroup>
  );
};

export default ModelTableActionButtons;
