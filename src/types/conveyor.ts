import type { ReactNode } from 'react';
import type { RegisterOptions } from 'react-hook-form';

import type { DataType, SelectOption } from './common';
import { ScalarType } from './magql';

export interface FieldOptions {
  label?: ReactNode;
  type?: string;
  required?: boolean;
  hidden?: boolean;
  editable?: boolean;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  valueOptions?: SelectOption[];
  inputProps?: DataType;
  displayProps?: DataType;
}

export enum NonScalarType {
  MODEL_ITEM = '__MODEL_ITEM__',
  MODEL_LIST = '__MODEL_LIST__',
}

export const FieldType = { ...ScalarType, ...NonScalarType };
