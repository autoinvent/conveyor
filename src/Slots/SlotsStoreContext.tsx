import { type ReactNode, Fragment, createContext, useMemo } from 'react';
import { type StoreApi, createStore, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface SlotsState {
  slotKeys: string[];
  currentSlotNodes: Record<string, ReactNode>;
  currentSlotIds: Record<string, string>;
  expiredSlotIds: Record<string, string[]>;
  replaceSlot: (slotKey: string, newSlotId: string, newNode: ReactNode) => void;
  renderSlot: (slotKey: string, node: ReactNode) => void;
}

export const SlotsStoreContext = createContext<
  StoreApi<SlotsState> | undefined
>(undefined);

export interface SlotsProps {
  slotKeys: string[];
  children?: ReactNode;
}
export const Slots = ({ slotKeys, children }: SlotsProps) => {
  const store = useMemo(
    () =>
      createStore(
        immer<SlotsState>((set) => ({
          slotKeys,
          currentSlotNodes: slotKeys.reduce<Record<string, ReactNode>>(
            (currentSlotIds, slotKey) => {
              currentSlotIds[slotKey] = null;
              return currentSlotIds;
            },
            {},
          ),
          currentSlotIds: slotKeys.reduce<Record<string, string>>(
            (currentSlotIds, slotKey) => {
              currentSlotIds[slotKey] = '';
              return currentSlotIds;
            },
            {},
          ),
          expiredSlotIds: slotKeys.reduce<Record<string, string[]>>(
            (expiredSlotIds, slotKey) => {
              expiredSlotIds[slotKey] = [];
              return expiredSlotIds;
            },
            {},
          ),
          replaceSlot: (slotKey, newSlotId, newNode) =>
            set((state) => {
              const currentSlotId = state.currentSlotIds[slotKey];
              if (currentSlotId) {
                state.expiredSlotIds[slotKey].push(currentSlotId);
              }
              state.currentSlotIds[slotKey] = newSlotId;
              state.currentSlotNodes[slotKey] = newNode;
            }),
          renderSlot: (slotKey, node) =>
            set((state) => {
              state.currentSlotNodes[slotKey] = node;
            }),
        })),
      ),
    [slotKeys],
  );
  const currentSlotNodes = useStore(store, (state) => state.currentSlotNodes);
  return (
    <SlotsStoreContext.Provider value={store}>
      {slotKeys.map((slotKey) => (
        <Fragment key={slotKey}>{currentSlotNodes[slotKey]}</Fragment>
      ))}
      {children}
    </SlotsStoreContext.Provider>
  );
};
