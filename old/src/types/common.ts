import type { ReactNode } from 'react';

export type DataType = Record<string, any>;

export enum DataLens {
  DISPLAY = 'display',
  INPUT = 'input',
}

export type StoreSelector<TState, T> = (state: TState) => T;

export type SelectOption = {
  label: ReactNode;
  value: any;
};
