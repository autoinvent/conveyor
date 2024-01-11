import { DisplayKeys } from '../contexts/DisplayKeyContext';
import useModelData from '../hooks/useModelData';
import { ModelField } from '../types';
import { getFieldName, getFieldType } from '../utils';
import Display from './Display';

interface DefaultDisplayInputProps {
  field: ModelField;
}

const DefaultDisplayInput = ({ field }: DefaultDisplayInputProps) => {
  const data = useModelData();
  const fieldName = getFieldName(field);
  const fieldType = getFieldType(field);
  let displayInput = null;
  switch (fieldType) {
    case 'Int':
    case 'Float':
    case 'Boolean':
    case 'Datetime':
    case 'String':
    default:
      displayInput = <input value={data[fieldName]} />;
  }

  return <Display activeKey={DisplayKeys.EDIT}>{displayInput}</Display>;
};

export default DefaultDisplayInput;
