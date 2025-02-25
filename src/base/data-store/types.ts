import type { StoreApi } from 'zustand';

import type { Data } from '@/base/types';

export interface DataState<
  TData extends Data = Data,
  TMeta extends Data = Data,
> {
  data: TData;
  meta?: TMeta;
}

export type DataStore = StoreApi<DataState>;
