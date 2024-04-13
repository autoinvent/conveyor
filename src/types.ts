export interface FetchHandler {
  onSuccess?: (data: any) => void;
  onError?: (err: Error) => void;
}

export type StoreSelector<TStore> = (state: TStore) => any
