import type { RegisterOptions } from 'react-hook-form';

import { ScalarTypes } from './magql';

export interface FieldOptions {
  label?: string;
  type?: string;
  editable?: boolean;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

export enum NonScalarTypes {
  DEFAULT = '__DEFAULT__',
  MODEL_ITEM = '__MODEL_ITEM__',
  MODEL_LIST = '__MODEL_LIST__',
}

export const FieldTypes = { ...ScalarTypes, ...NonScalarTypes };
