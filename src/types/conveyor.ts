import type { RegisterOptions } from 'react-hook-form';

import { ScalarTypes } from './magql';

export interface Field {
  id: number;
  name: string;
  type: string;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  sortable?: boolean;
  editable?: boolean;
}

export enum NonScalarTypes {
  DEFAULT = '__DEFAULT__',
  MODEL_ITEM = '__MODEL_ITEM__',
  MODEL_LIST = '__MODEL_LIST__',
}

export const FieldTypes = { ...ScalarTypes, ...NonScalarTypes };
export type FieldTypes = typeof FieldTypes;
