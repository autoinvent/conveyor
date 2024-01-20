import { ElementType } from 'react';
import { useFormContext } from 'react-hook-form';

import { Field } from '../types';
import { getFieldName, getFieldType } from '../utils';

interface FieldInputProps {
  field: Field;
  Component?: ElementType;
  props?: Record<string, any>;
}
const FieldInput = ({ field, Component, props }: FieldInputProps) => {
  const { register } = useFormContext();
  const fieldName = getFieldName(field);
  const fieldType = getFieldType(field);
  let Input = Component;
  if (!Input) {
    switch (fieldType) {
      case 'Int':
      case 'Float':
      case 'Boolean':
      case 'Datetime':
      case 'String':
      default:
        Input = 'input';
    }
  }
  return <Input {...props} {...register(fieldName)} />;
};

export default FieldInput;
