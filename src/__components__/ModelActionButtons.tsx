import { Button, ButtonGroup } from 'react-bootstrap';
import {
  FaRegTrashAlt,
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
} from 'react-icons/fa';

import Display from './Display';
import { DisplayKeys } from '../__contexts__/DisplayKeyContext';
import { BaseComponentProps } from '../__types';

interface ModelActionButtonsProps extends BaseComponentProps {}

const ModelActionButtons = ({ id, className }: ModelActionButtonsProps) => {
  return (
    <ButtonGroup id={id} className={className}>
      <Display activeKey={DisplayKeys.VALUE}>
        <Button variant='outline-primary'>
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
        <Button variant='outline-primary'>
          <FaRegTimesCircle />
        </Button>
      </Display>
    </ButtonGroup>
  );
};

export default ModelActionButtons;
