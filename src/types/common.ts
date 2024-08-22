export type DataType = Record<string, any>;

export enum DataLens {
  DISPLAY = 'DISPLAY',
  INPUT = 'input',
}

export interface ActionParams<D extends DataType> {
  data: D;
  changedData: D;
  onEdit: () => void;
  onCancelEdit: () => void;
}
export type OnActionTrigger<D extends DataType> =
  | ((params: ActionParams<D>) => Promise<any>)
  | ((params: ActionParams<D>) => void);

export type StoreSelector<TState, T> = (state: TState) => T;

export type SelectOption = {
  label: string;
  value: any;
};
