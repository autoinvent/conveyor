import type { ReactNode } from 'react';

import type { StoreApi } from 'zustand';

export interface SlotsState {
  slotIds: string[];
  slotNodes: Record<string, ReactNode>;
  setSlot: (slotId: string, slotNode: ReactNode) => void;
}

export type SlotsStore = StoreApi<SlotsState>;
