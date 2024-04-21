import { DependencyList, useEffect, useRef } from 'react';
import { Store } from '@tanstack/react-store';

export const useIsFirstRender = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  return isFirstRender;
};

export interface UseStoreSetStateEffectParams<TStore> {
  store: Store<TStore>;
  setState: (state: TStore) => TStore;
  deps?: DependencyList;
  ignoreFirstRender?: boolean;
}
export const useStoreSetStateEffect = <TStore,>({
  store,
  setState,
  deps,
  ignoreFirstRender = true,
}: UseStoreSetStateEffectParams<TStore>) => {
  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (!isFirstRender.current || !ignoreFirstRender) {
      store.setState(setState);
    }
  }, deps);
};
