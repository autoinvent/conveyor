import { ElementType } from 'react';

import useModelData from '../hooks/useModelData';
import { ModelField } from '../types';
import { getFieldName, getFieldType } from '../utils';

interface ModelValueProps {
  field: ModelField;
  Component?: ElementType;
  props?: Record<string, any>;
}
const ModelValue = ({ field, Component, props }: ModelValueProps) => {
  const data = useModelData();
  const fieldName = getFieldName(field);
  const fieldType = getFieldType(field);
  let Value = Component;
  if (!Value) {
    switch (fieldType) {
      case 'Int':
      case 'Float':
      case 'Boolean':
      case 'Datetime':
      case 'String':
      default:
        Value = (props) => <>{props.data[fieldName]}</>;
    }
  }
  return <Value {...props} data={data} />;
};

export default ModelValue;
