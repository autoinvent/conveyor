import Select from 'react-select';

import { BaseProps } from '../../types';

import Checkbox from './Checkbox';
import ErrorList from './ErrorList';

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
  let inputTag: any;
  switch (type) {
    case InputTypes.SELECT: {
      inputTag = (
        <Select
          id={id}
          className={`select ${className ?? ''}`}
          classNamePrefix="select"
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
