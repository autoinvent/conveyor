import { DisplayKeys } from '../__contexts__/DisplayKeyContext';
import useModelData from '../__hooks__/useModelData';
import { ModelField } from '../__types';
import Display from './Display';

interface DefaultDisplayInputProps {
  field: ModelField;
}

const DefaultDisplayInput = ({ field }: DefaultDisplayInputProps) => {
  const data = useModelData();
  const fieldName = typeof field === 'string' ? field : field.name;
  const fieldType = typeof field === 'string' ? 'String' : field.type;
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
