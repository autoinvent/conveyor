import type { ReactNode } from 'react';

import type { RegisterOptions } from 'react-hook-form';

import type { DataType } from './common';
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
  inputProps?: DataType;
  displayProps?: DataType;
}

export enum NonScalarType {
  MODEL = '__MODEL__',
  ENUM = '__ENUM__',
}

export const FieldType = { ...ScalarType, ...NonScalarType };
