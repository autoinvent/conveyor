import Select from 'react-select';

import { BaseProps } from '../../types';

import Checkbox from './Checkbox';
import ErrorList from './ErrorList';
import { Form } from 'react-bootstrap';

export enum InputTypes {
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'checkbox',
  SELECT = 'select',
  DATETIME = 'datetime-local',
}
export interface FlexibleInputProps extends BaseProps {
  type: InputTypes;
  disabled?: boolean;
  inputProps?: Record<string, any>;
  errors?: string | string[];
}

const FlexibleInput = ({
  id,
  className,
  type,
  disabled,
  inputProps = {},
  errors,
}: FlexibleInputProps) => {
  let inputTag;
  switch (type) {
    case InputTypes.SELECT: {
      inputTag = (
        <Select
          id={id}
          className={`select ${className ?? ''}`}
          classNamePrefix='select'
          isDisabled={disabled}
          {...inputProps}
        />
      );
      break;
    }
    case InputTypes.BOOLEAN: {
      inputProps.ref = undefined;
      inputTag = (
        <Checkbox
          id={id}
          className={className}
          {...inputProps}
          disabled={disabled}
        />
      );
      break;
    }
    case InputTypes.TEXT: {
      inputTag = (
        <Form.Control
          id={id}
          className={className}
          type={type}
          as='textarea'
          rows={1}
          {...inputProps}
          disabled={disabled}
        />
      );
      break;
    }
    default: {
      inputTag = (
        <input
          id={id}
          className={className}
          type={type}
          {...inputProps}
          disabled={disabled}
        />
      );
    }
  }

  return (
    <>
      {inputTag}
      <ErrorList errors={errors} />
    </>
  );
};

export default FlexibleInput;
