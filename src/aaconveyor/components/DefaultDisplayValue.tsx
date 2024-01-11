import { DisplayKeys } from '../contexts/DisplayKeyContext';
import useModelData from '../hooks/useModelData';
import { ModelField } from '../types';
import { getFieldName, getFieldType } from '../utils';
import Display from './Display';

interface DefaultDisplayValueProps {
  field: ModelField;
}

const DefaultDisplayValue = ({ field }: DefaultDisplayValueProps) => {
  const data = useModelData();
  const fieldName = getFieldName(field);
  const fieldType = getFieldType(field);
  let displayValue = null;
  switch (fieldType) {
    case 'Int':
    case 'Float':
    case 'Boolean':
    case 'Datetime':
    case 'String':
    default:
      displayValue = data[fieldName];
  }

  return <Display activeKey={DisplayKeys.VALUE}>{displayValue}</Display>;
};

export default DefaultDisplayValue;
