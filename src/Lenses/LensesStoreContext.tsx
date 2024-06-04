import { type ReactNode, createContext, useMemo } from 'react';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface LensesState {
  activeLens: boolean | string | number;
}

export const LensesStoreContext = createContext<
  StoreApi<LensesState> | undefined
>(undefined);

export type LensType = boolean | string | number;
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
  // biome-ignore lint/correctness/useExhaustiveDependencies: initialLens is used as an initial value for activeLens
  const store = useMemo(
    () =>
      createStore(
        immer<LensesState>((set) => ({
          activeLens: activeLens ?? initialLens,
          setLens: (newLens: LensType) =>
            set((state) => {
              state.activeLens = newLens;
            }),
        })),
      ),
    [activeLens],
  );
  return (
    <LensesStoreContext.Provider value={store}>
      {children}
    </LensesStoreContext.Provider>
  );
};
