export type DataType = Record<string, any>;

export enum DataLens {
  VALUE = 'value',
  INPUT = 'input',
}

export type OnCreate<D extends DataType> =
  | ((data?: Partial<D>) => Promise<any>)
  | ((data?: Partial<D>) => void);

export type OnUpdate<D extends DataType> =
  | (({
      data,
      dirtyFields,
    }: {
      data?: Partial<D>;
      dirtyFields?: Record<string, boolean>;
    }) => Promise<any>)
  | (({
      data,
      dirtyFields,
    }: { data?: Partial<D>; dirtyFields?: Record<string, boolean> }) => void);

export type OnDelete<D extends DataType> =
  | ((data?: Partial<D>) => Promise<any>)
  | ((data?: Partial<D>) => void);

export type StoreSelector<TState, T> = (state: TState) => T;
