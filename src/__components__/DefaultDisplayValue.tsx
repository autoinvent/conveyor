import { DisplayKeys } from '../__contexts__/DisplayKeyContext';
import useModelData from '../__hooks__/useModelData';
import { ModelField } from '../__types';
import { getFieldName, getFieldType } from '../__utils__';
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
