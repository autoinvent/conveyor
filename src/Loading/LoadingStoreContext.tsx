import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface LoadingState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const LoadingStoreContext = createContext<
  StoreApi<LoadingState> | undefined
>(undefined);

export interface LoadingProps {
  initialIsLoading?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
}
export const LoadingStoreProvider = ({
  initialIsLoading = false,
  isLoading,
  children,
}: LoadingProps) => {
  const [initIsLoading] = useState(initialIsLoading);
  const [store] = useState(() =>
    createStore(
      immer<LoadingState>((set) => ({
        isLoading: isLoading ?? initIsLoading,
        setIsLoading: (newIsLoading) =>
          set((state) => {
            state.isLoading = newIsLoading;
          }),
      })),
    ),
  );

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current)
      store.setState((state) => {
        state.isLoading = isLoading ?? initialIsLoading;
      });
  }, [isLoading, initialIsLoading, store]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <LoadingStoreContext.Provider value={store}>
      {children}
    </LoadingStoreContext.Provider>
  );
};
