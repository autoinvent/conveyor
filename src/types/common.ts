export type StoreSelector<TStore> = (state: TStore) => any;

export interface Field {
  name: string;
  type: string;
  many?: boolean;
  required?: boolean;
  sortable?: boolean;
}
