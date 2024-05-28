import { useEffect, useRef, useState } from 'react';
import { Store, useStore as tsUseStore } from '@tanstack/react-store';

export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return isMounted;
};

export const useDependencyStore = <T,>(dependencies: T) => {
  const [store] = useState(new Store<T>(dependencies));
  const isMounted = useIsMounted();

  let effectDependencyList = [dependencies];
  let newDependencyState = dependencies;
  if (typeof dependencies === 'object' && !Array.isArray(dependencies)) {
    effectDependencyList = Object.values(dependencies as Object);
    newDependencyState = { ...dependencies };
  }

  useEffect(() => {
    if (isMounted.current) {
      store.setState(() => newDependencyState);
    }
  }, effectDependencyList);
  return store;
};

export const useStore = tsUseStore;
