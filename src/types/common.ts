import { DataType } from '@/Data';

export type StoreSelector<TStore> = (state: TStore) => any;

export interface Field {
  name: string;
  type: string;
  many?: boolean;
  required?: boolean;
  sortable?: boolean;
  editable?: boolean;
}

export interface OnSaveProps {
  data: DataType;
  dirtyFields: Record<string, boolean>;
}
