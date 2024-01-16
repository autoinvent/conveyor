import { ElementType } from 'react';
import { useFormContext } from 'react-hook-form';

import { ModelField } from '../types';
import { getFieldName, getFieldType } from '../utils';

interface ModelInputProps {
  field: ModelField;
  Component?: ElementType;
  props?: Record<string, any>;
}
const ModelInput = ({ field, Component, props }: ModelInputProps) => {
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

export default ModelInput;
