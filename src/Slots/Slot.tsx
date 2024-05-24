import { type ReactNode, useEffect, useId } from 'react';

import type { SlotType } from './SlotsStoreContext';
import { useSlots } from './useSlots';

export interface SlotProps {
  slot: string;
  children?: ReactNode;
}

export const Slot = ({ slot, children }: SlotProps) => {
  const refId = useId();
  const { setSlots } = useSlots();
  useEffect(() => {
    setSlots((state) => {
      const currSlot = state.slots[slot];
      const newSlot: SlotType = { node: children, refIds: [refId] };
      if (currSlot) {
        if (currSlot.refIds.includes(refId)) {
          // Return the same state if an old refId is being used
          if (currSlot.refIds[0] !== refId) {
            return state;
          } else {
            // No need to update refIds if using the latest refId
            newSlot.refIds = currSlot.refIds;
          }
        } else {
          // New refId is being used; update refIds
          newSlot.refIds = [refId, ...currSlot.refIds];
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

  useEffect(() => {
    return () => {
      // Cleanup for when slot no longer exist in dom structure
      setSlots((state) => {
        const currSlot = state.slots[slot];
        if (currSlot.refIds[0] === refId) {
          currSlot.node = null;
        }
        currSlot.refIds = currSlot.refIds.filter(
          (currRefId) => currRefId != refId,
        );

        return {
          ...state,
          [slot]: currSlot,
        };
      });
    };
  }, []);

  return null;
};
