import type { ReactNode } from 'react';

export type DataType = Record<string, any>;

export enum DataLens {
  VALUE = 'value',
  INPUT = 'input',
}

export interface ActionParams<D extends DataType> {
  data: Exclude<D, undefined>;
  dirtyFields: Record<string, boolean>;
}
export type OnCreate<D extends DataType> =
  | ((params?: ActionParams<D>) => Promise<any>)
  | ((params?: ActionParams<D>) => void);

export type OnUpdate<D extends DataType> =
  | ((params?: ActionParams<D>) => Promise<any>)
  | ((params?: ActionParams<D>) => void);

export type OnDelete<D extends DataType> =
  | ((data?: D) => Promise<any>)
  | ((data?: D) => void);

export type StoreSelector<TState, T> = (state: TState) => T;

export type SelectOption = { value: number | string | null; label: ReactNode };
