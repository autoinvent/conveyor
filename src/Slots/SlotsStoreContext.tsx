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

export interface SlotNode {
  id: string;
  node: ReactNode;
  expiredIds: string[];
}

export interface SlotsState {
  slotKeys: string[];
  slotNodes: Record<string, SlotNode>;
  initalizeSlot: (slotKey: string, newId: string, newNode: ReactNode) => void;
  replaceSlot: (slotKey: string, newId: string, newNode: ReactNode) => void;
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
  const [store] = useState(() =>
    createStore(
      immer<SlotsState>((set) => ({
        slotKeys,
        slotNodes: {},
        initalizeSlot: (slotKey, newId, newNode) =>
          set((state) => {
            state.slotNodes[slotKey] = {
              id: newId,
              node: newNode,
              expiredIds: [],
            };
          }),
        replaceSlot: (slotKey, newId, newNode) =>
          set((state) => {
            const slotNode = state.slotNodes[slotKey];
            if (slotNode.id) {
              state.slotNodes[slotKey].expiredIds.push(slotNode.id);
            }
            state.slotNodes[slotKey].id = newId;
            state.slotNodes[slotKey].node = newNode;
          }),
        renderSlot: (slotKey, node) =>
          set((state) => {
            state.slotNodes[slotKey].node = node;
          }),
      })),
    ),
  );

  const slotNodes = useStore(store, (state) => state.slotNodes);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      store.setState((state) => {
        state.slotKeys = slotKeys;
      });
    }
  }, [slotKeys, store]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <SlotsStoreContext.Provider value={store}>
      {slotKeys.map((slotKey) => (
        <Fragment key={slotKey}>{slotNodes?.[slotKey]?.node ?? null}</Fragment>
      ))}
      {children}
    </SlotsStoreContext.Provider>
  );
};
