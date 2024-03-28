import { ReactNode, useEffect, useId } from 'react';

import { WrapperProp } from '@/types';

import { SlotType } from './SlotsStoreContext';
import { useSlotsStore } from './useSlotsStore';

export interface SlotProps extends WrapperProp {
  slot: string;
  children?: ReactNode;
}

export const Slot = ({ slot, children }: SlotProps) => {
  const refId = useId();
  const slotsStore = useSlotsStore();
  useEffect(() => {
    slotsStore.setState((state) => {
      const currSlot = state.slots[slot];
      const newSlot: SlotType = { node: children, slotIds: [refId] };
      if (currSlot) {
        if (currSlot.slotIds.includes(refId)) {
          // Return the same state if an old refId is being used
          if (currSlot.slotIds[0] !== refId) {
            return state;
          } else {
            // No need to update slotIds if using the latest refId
            newSlot.slotIds = currSlot.slotIds;
          }
        } else {
          // New refId is being used; update slotIds
          newSlot.slotIds = [refId, ...currSlot.slotIds];
        }
      }
      return {
        ...state,
        slots: {
          ...state.slots,
          [slot]: newSlot,
        },
      };
    });
  }, [children]);

  return null;
};
