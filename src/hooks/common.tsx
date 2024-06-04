import { useEffect, useRef, useState } from 'react';
import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return isMounted;
};

export const useCreateStore = <T extends Record<string, any>>(
  storeState: T,
) => {
  const [store] = useState(() =>
    createStore(
      immer<T>(() => ({
        ...storeState,
      })),
    ),
  );

  useEffect(() => {
    store.setState(storeState);
  }, [storeState, store]);

  return store;
  // const isMounted = useIsMounted();

  // let effectDependencyList = [dependencies];
  // let newDependencyState = dependencies;
  // if (typeof dependencies === 'object' && !Array.isArray(dependencies)) {
  //   effectDependencyList = Object.values(dependencies as Object);
  //   newDependencyState = { ...dependencies };
  // }

  // useEffect(() => {
  //   if (isMounted.current) {
  //     store.setState(() => newDependencyState);
  //   }
  // }, effectDependencyList);
  // return store;
};
