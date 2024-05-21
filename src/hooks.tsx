import { useEffect, useRef, useState } from 'react';
import { Store, useStore as tsUseStore } from '@tanstack/react-store';

export const useIsFirstRender = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  return isFirstRender;
};

export const useDependencyStore = <T,>(dependencies: T) => {
  const [store] = useState(new Store<T>(dependencies));
  const isFirstRender = useIsFirstRender();

  let effectDependencyList = [dependencies];
  let newDependencyState = dependencies;
  if (typeof dependencies === 'object' && !Array.isArray(dependencies)) {
    effectDependencyList = Object.values(dependencies as Object);
    newDependencyState = { ...dependencies };
  }

  useEffect(() => {
    if (!isFirstRender.current) {
      store.setState(() => newDependencyState);
    }
  }, effectDependencyList);
  return store;
};

export const useStore = tsUseStore;
