import { ComponentType } from 'react';

import { ScalarTypes, parseMQLType } from '@/Conveyor';

export interface FlexibleInputProps {
  type: string;
  inputProps?: Record<string, any>;
  InputComponent?: ComponentType<Record<string, any>>;
}

export const FlexibleInput = ({
  type,
  inputProps,
  InputComponent = DefaultInput,
}: FlexibleInputProps) => {
  const { baseType, required, isArray } = parseMQLType(type);
  let currInputProps: Record<string, any> = { required };
  switch (baseType) {
    case ScalarTypes.STRING:
      currInputProps.type = 'text';
      break;
    case ScalarTypes.INT:
    case ScalarTypes.FLOAT:
      currInputProps.type = 'number';
      break;
    case ScalarTypes.BOOLEAN:
      currInputProps.type = 'checkbox';
      break;
    case ScalarTypes.DATETIME:
      break;
    default:
      break;
  }
  currInputProps = Object.assign(currInputProps, inputProps);

  // TODO: remove and replace
  if (currInputProps.value === undefined) currInputProps.value = 2;
  if (currInputProps.value === null) currInputProps.value = 1;

  return <InputComponent {...currInputProps} />;
};

const DefaultInput = (props: any) => <input {...props} />;
