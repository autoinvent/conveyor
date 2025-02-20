import type { Data } from '@/base/types';
import type { StoreApi } from 'zustand';

export interface DataState<
  TData extends Data = Data,
  TMeta extends Data = Data,
> {
  data: TData;
  meta?: TMeta;
}

export type DataStore = StoreApi<DataState>;
