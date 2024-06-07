export type DataType = Record<string, any>;

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}

export enum DataLens {
  VALUE = 'value',
  INPUT = 'input',
}

export type OnCreate<D extends DataType> = (
  data?: Partial<D>,
) => Promise<any> | undefined;

export type OnUpdate<D extends DataType> = ({
  data,
  dirtyFields,
}: { data?: Partial<D>; dirtyFields?: Record<string, boolean> }) =>
  | Promise<any>
  | undefined;

export type OnDelete<D extends DataType> = (
  data?: Partial<D>,
) => Promise<any> | undefined;

export type StoreSelector<TState, T> = (state: TState) => T;
