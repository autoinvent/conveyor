export type DataType = Record<string, any>;

export interface Field {
  name: string;
  type: string;
  many?: boolean;
  required?: boolean;
  sortable?: boolean;
  editable?: boolean;
}

export enum DefaultTypes {
  MODEL = '__default_model__',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
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
