import { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
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
import { ModelTableContext } from '../contexts/ModelTableContext';
import { BaseComponentProps } from '../types';
import Display from './Display';

interface ModelTableActionButtonsProps extends BaseComponentProps { }

const ModelTableActionButtons = ({
  id,
  className,
}: ModelTableActionButtonsProps) => {
  const { onSave } = useContext(ModelTableContext)
  const { handleSubmit, formState: { dirtyFields }, reset } = useFormContext()
  const setDisplayKey = useContext(SetDisplayKeyContext);
  const onEdit = () => setDisplayKey(DisplayKeys.EDIT);
  const onCancelEdit = () => {
    setDisplayKey(DisplayKeys.VALUE)
    reset()
  };
  const onSaveHandler = handleSubmit((formValues) => {
    // TODO: push unchanged required input to dirty fields for efficiency 
    // const dirtyValues = Object.fromEntries(Object.entries(dirtyFields).map(([fieldName,]) => [fieldName, formValues[fieldName]]))
    onSave?.(formValues)?.then((res: any) => {
      reset()
    })
  })
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
        <Button variant='outline-success' onClick={onSaveHandler}>
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
