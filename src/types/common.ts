import type { DataType } from '@/Data';

export type StoreSelector<TState, T> = (state: TState) => T

export interface OnSaveProps {
  data: DataType;
  dirtyFields: Record<string, boolean>;
}
