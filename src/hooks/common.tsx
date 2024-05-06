import { useEffect, useRef } from 'react';
import { useStore as tsUseStore } from '@tanstack/react-store';

export const useIsFirstRender = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  return isFirstRender;
};

export const useStore = tsUseStore;
