import {
  Fragment,
  type ReactNode,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  const initalSlotNodes = useMemo(
    () =>
      slotKeys.reduce<Record<string, ReactNode>>((currentSlotIds, slotKey) => {
        currentSlotIds[slotKey] = null;
        return currentSlotIds;
      }, {}),
    [slotKeys],
  );
  const initalSlotIds = useMemo(
    () =>
      slotKeys.reduce<Record<string, string>>((currentSlotIds, slotKey) => {
        currentSlotIds[slotKey] = '';
        return currentSlotIds;
      }, {}),
    [slotKeys],
  );
  const initialExpiredSlotIds = useMemo(
    () =>
      slotKeys.reduce<Record<string, string[]>>((expiredSlotIds, slotKey) => {
        expiredSlotIds[slotKey] = [];
        return expiredSlotIds;
      }, {}),
    [slotKeys],
  );

  const [store] = useState(() =>
    createStore(
      immer<SlotsState>((set) => ({
        slotKeys,
        currentSlotNodes: initalSlotNodes,
        currentSlotIds: initalSlotIds,
        expiredSlotIds: initialExpiredSlotIds,
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
  );

  const currentSlotNodes = useStore(store, (state) => state.currentSlotNodes);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current)
      store.setState((state) => {
        state.slotKeys = slotKeys;
        state.currentSlotNodes = initalSlotNodes;
        state.currentSlotIds = initalSlotIds;
        state.expiredSlotIds = initialExpiredSlotIds;
      });
  }, [slotKeys, initalSlotNodes, initalSlotIds, initialExpiredSlotIds, store]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <SlotsStoreContext.Provider value={store}>
      {slotKeys.map((slotKey) => (
        <Fragment key={slotKey}>{currentSlotNodes[slotKey]}</Fragment>
      ))}
      {children}
    </SlotsStoreContext.Provider>
  );
};
