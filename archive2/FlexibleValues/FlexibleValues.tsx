import { ReactNode } from 'react';

import { Lenses } from '@/Lenses';
import { Slots } from '@/Slots';
import { ScalarFieldTypes } from '@/types';

import { FlexibleValue } from './FlexibleValue';

export interface FlexibleValuesProps {
  valueType: string;
  value: any;
  children?: ReactNode;
}
export const FlexibleValues = ({
  valueType,
  value,
  children,
}: FlexibleValuesProps) => {
  const valueTypes: string[] = Object.values(ScalarFieldTypes);
  let currValueType = valueType;
  if (!valueTypes.includes(currValueType)) {
    valueTypes.push(currValueType);
    currValueType = ScalarFieldTypes.DEFAULT;
  }
  return (
    <Lenses activeLens={currValueType}>
      <Slots slotKeys={valueTypes}>
        <FlexibleValue valueType={ScalarFieldTypes.BOOLEAN}>
          {value}
        </FlexibleValue>
        <FlexibleValue valueType={ScalarFieldTypes.DATETIME}>
          {value}
        </FlexibleValue>
        <FlexibleValue valueType={ScalarFieldTypes.FLOAT}>
          {value}
        </FlexibleValue>
        <FlexibleValue valueType={ScalarFieldTypes.INT}>{value}</FlexibleValue>
        <FlexibleValue valueType={ScalarFieldTypes.STRING}>
          {value}
        </FlexibleValue>
        <FlexibleValue valueType={ScalarFieldTypes.DEFAULT}>
          {JSON.stringify(value)}
        </FlexibleValue>
        {children}
      </Slots>
    </Lenses>
  );
};
