import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type LensType = boolean | string | number;

export interface LensesState {
  activeLens: LensType;
  setLens: (newLens: LensType) => void;
}

export const LensesStoreContext = createContext<
  StoreApi<LensesState> | undefined
>(undefined);

export interface LensesProps {
  initialLens?: LensType;
  activeLens?: LensType;
  children?: ReactNode;
}
export const Lenses = ({
  initialLens = false,
  activeLens,
  children,
}: LensesProps) => {
  const [store] = useState(() =>
    createStore(
      immer<LensesState>((set) => ({
        activeLens: activeLens ?? initialLens,
        setLens: (newLens: LensType) =>
          set((state) => {
            state.activeLens = newLens;
          }),
      })),
    ),
  );

  const isMounted = useRef(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialLens meant to be used during first render only
  useEffect(() => {
    if (isMounted.current)
      store.setState((state) => {
        state.activeLens = activeLens ?? initialLens;
      });
  }, [activeLens, store]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <LensesStoreContext.Provider value={store}>
      {children}
    </LensesStoreContext.Provider>
  );
};
