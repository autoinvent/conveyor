import {
  Fragment,
  type PropsWithChildren,
  createContext,
  useEffect,
  useRef,
} from 'react';

import type { SlotsState, SlotsStore } from '../types';
import { createStore, useStore } from 'zustand';

export const SlotsContext = createContext<SlotsStore | null>(null);

export interface SlotsProviderProps
  extends PropsWithChildren<Pick<SlotsState, 'slotIds'>> {}

export const SlotProvider = ({ slotIds, children }: SlotsProviderProps) => {
  const storeRef = useRef<SlotsStore>(null);
  if (!storeRef.current) {
    storeRef.current = createStore<SlotsState>()((set) => ({
      slotIds,
      slotNodes: {},
      setSlot: (slotId, slotNode) => {
        set((state) => ({
          slotNodes: { ...state.slotNodes, [slotId]: slotNode },
        }));
      },
    }));
  }

  const slotNodes = useStore(storeRef.current, (state) => state.slotNodes);

  useEffect(() => {
    storeRef.current?.setState({ slotIds });
  }, [slotIds]);

  return (
    <SlotsContext value={storeRef.current}>
      {slotIds.map((slotId) => (
        <Fragment key={`slot-${slotId}`}>{slotNodes[slotId]}</Fragment>
      ))}
      {children}
    </SlotsContext>
  );
};
