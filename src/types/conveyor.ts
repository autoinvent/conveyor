import type { RegisterOptions } from 'react-hook-form';

import { ScalarType } from './magql';

export interface FieldOptions {
  label?: string;
  type?: string;
  hidden?: boolean;
  editable?: boolean;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

export enum NonScalarType {
  MODEL_ITEM = '__MODEL_ITEM__',
  MODEL_LIST = '__MODEL_LIST__',
}

export const FieldType = { ...ScalarType, ...NonScalarType };
