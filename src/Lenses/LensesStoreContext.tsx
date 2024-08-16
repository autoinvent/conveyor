import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type StoreApi, createStore } from 'zustand';

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
  const [initLens] = useState(initialLens);
  const [store] = useState(() =>
    createStore<LensesState>((set) => ({
      activeLens: activeLens ?? initLens,
      setLens: (newLens) => set({ activeLens: newLens }),
    })),
  );

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current)
      store.setState((state) => {
        state.activeLens = activeLens ?? initLens;
      });
  }, [activeLens, initLens, store]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <LensesStoreContext.Provider value={store}>
      {children}
    </LensesStoreContext.Provider>
  );
};
