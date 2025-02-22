import {
  Fragment,
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useEffect,
  useRef,
} from 'react';

import type { SlotsState, SlotsStore } from '../types';
import { createStore, useStore } from 'zustand';

export const SlotsContext = createContext<SlotsStore | null>(null);

export interface SlotsProviderProps
  extends PropsWithChildren<Pick<SlotsState, 'slotIds'>> {
  defaultSlotNodes: Record<string, ReactNode>;
}

export const SlotsProvider = ({
  slotIds,
  defaultSlotNodes,
  children,
}: SlotsProviderProps) => {
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
        <Fragment key={slotId}>
          {slotNodes[slotId] === undefined
            ? defaultSlotNodes[slotId]
            : slotNodes[slotId]}
        </Fragment>
      ))}
      {children}
    </SlotsContext>
  );
};
